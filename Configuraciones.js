document.addEventListener("DOMContentLoaded", function () {
    //DECLARACION DE CONSTANTES 
    const fechaInput = document.getElementById("fechaSorteo");
    const fechaBtn = document.getElementById("fechaHoyBtn");
    const continuarBtn = document.getElementById("continuarBtn");
    const fechasSugeridas = document.getElementById("fechasSugeridas");
    const buttons = document.querySelectorAll(".opcion");

    const mostrarMasBtn = [...buttons].find(b => b.textContent.trim() === "Mostrar más");
    const masOpciones = document.getElementById("masOpciones");
    const eventoPersonalizado = document.getElementById("eventoPersonalizado");

    masOpciones.classList.add("d-none");
    eventoPersonalizado.value = "";

    mostrarMasBtn.addEventListener("click", function(){
        masOpciones.classList.toggle("d-none");
        document.querySelectorAll(".opcion").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        localStorage.removeItem("evento");
        validar();
    });

    eventoPersonalizado.addEventListener("input", function(){
        if(this.value.trim() !== ""){
            localStorage.setItem("evento", this.value.trim());
        } else {
            localStorage.removeItem("evento");
        }
        validar();
    });

    const opcionesFecha = document.querySelectorAll(".opcion-fecha");
    const fechaPersonalizada = document.getElementById("fechaPersonalizada");

    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split("T")[0];

    fechaInput.min = fechaHoy;

    opcionesFecha.forEach(btn => {

    btn.addEventListener("click", function(){
        opcionesFecha.forEach(b => b.classList.remove("active"));
        this.classList.add("active");

            if(this.textContent === "Otro"){
                fechaPersonalizada.classList.remove("d-none");
                localStorage.removeItem("fechaSorteo");
            }
            else{
                fechaPersonalizada.classList.add("d-none");

                let dias = 0;

                if(this.textContent === "En 3 días") dias = 3;
                if(this.textContent === "En 1 semana") dias = 7;
                if(this.textContent === "En 2 semanas") dias = 14;

                const fechaCalculada = new Date();
                fechaCalculada.setDate(fechaCalculada.getDate() + dias);

                const fechaFormato = fechaCalculada.toISOString().split("T")[0];

                localStorage.setItem("fechaSorteo", fechaFormato);
            }
            validar();
        });

    });

    fechaInput.addEventListener("input", function(){
        localStorage.setItem("fechaSorteo", fechaInput.value);
        validar();
    });

    //FUNCION PARA ELEGIR EL TIPO DE EVENTO 
    document.querySelectorAll(".opcion").forEach(btn => {
        btn.addEventListener("click", function(){
            document.querySelectorAll(".opcion").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            localStorage.setItem("evento", this.textContent.trim());
            validar();
        });
    });

    const eventoGuardado = localStorage.getItem("evento");

    if (eventoGuardado) {
        let coincideConBoton = false;
        buttons.forEach(button => {
            if (button.textContent.trim() === eventoGuardado){
                button.classList.add("active");
                coincideConBoton = true;
            }
        });

        // Si no coincide con ningún botón es personalizado
        if (!coincideConBoton){
            masOpciones.classList.remove("d-none");
            mostrarMasBtn.classList.add("active");
            eventoPersonalizado.value = eventoGuardado;
        }
    }

    // FUNCION PARA SUGERIR LAS FECHAS
    const sugerencias = [3, 7, 14];

    sugerencias.forEach(dias => {

        const fechaCalculada = new Date();
        fechaCalculada.setDate(fechaCalculada.getDate() + dias);

        const fechaFormato = fechaCalculada.toISOString().split("T")[0];

        const fechaBonita = fechaCalculada.toLocaleDateString("es-MX", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn opcion-fecha";
        btn.textContent = dias + " días (" + fechaBonita + ")";

        btn.addEventListener("click", function () {
            fechaInput.value = fechaFormato;
            localStorage.setItem("fechaSorteo", fechaFormato);
            document.querySelectorAll("#fechasSugeridas button").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            fechaPersonalizada.classList.add("d-none");
            validar();
        });

        fechasSugeridas.appendChild(btn);
    });

    fechaBtn.addEventListener("click", function () {
        fechaInput.value = fechaHoy;
        localStorage.setItem("fechaSorteo", fechaHoy);
        validar();
    });

    const fechaGuardada = localStorage.getItem("fechaSorteo");

    if (fechaGuardada) {
        fechaInput.value = fechaGuardada;
    }

    fechaInput.addEventListener("input", function () {
        localStorage.setItem("fechaSorteo", fechaInput.value);
        validar();
    });

    const sugerenciasPrecio = [200, 300, 500];
    const preciosSugeridos = document.getElementById("preciosSugeridos");
    const precioPersonalizado = document.getElementById("precioPersonalizado");
    const precioInput = document.getElementById("precioMaximo");

    sugerenciasPrecio.forEach(precio => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn opcion-precio";
        btn.textContent = "$" + precio;
        btn.addEventListener("click", function(){
            localStorage.setItem("precioMaximo", precio);
            document.querySelectorAll("#preciosSugeridos button").forEach(b => b.classList.remove("active"));

            this.classList.add("active");
            precioPersonalizado.classList.add("d-none");
            precioPersonalizado.classList.add("d-none");
        });
        preciosSugeridos.appendChild(btn);
    });

    const otroPrecioBtn = document.getElementById("otroPrecio");
    otroPrecioBtn.addEventListener("click", function(){
        document.querySelectorAll(".opcion-precio").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        precioPersonalizado.classList.remove("d-none");
        localStorage.removeItem("precioMaximo");
    });

    precioInput.addEventListener("input", function(){
        localStorage.setItem("precioMaximo", precioInput.value);
    });

    function validar() {
        const evento = localStorage.getItem("evento");
        const fecha = fechaInput.value;
        continuarBtn.disabled = !(evento && fecha);
    }

    validar();

    continuarBtn.addEventListener("click", function () {

        const evento = localStorage.getItem("evento");
        const fecha = fechaInput.value;

        if (!evento || !fecha) {
            alert("Debes seleccionar evento y fecha");
            return;
        }

        const participantes = JSON.parse(localStorage.getItem("participantes")) || [];

        if (participantes.length < 2) {
            alert("Necesitas al menos 2 participantes para hacer el sorteo");
            return;
        }

        const exclusiones = JSON.parse(localStorage.getItem("exclusiones")) || {};
        const resultados = sortear(participantes, exclusiones);

        if(!resultados){
            alert("No se pudo generar un sorteo válido con las exclusiones.");
            return;
        }

        // Si se pudo sortear exitosamente guarda los resultados en el localstorage
        localStorage.setItem("resultados", JSON.stringify(resultados));
        window.location.href = "Evento.html"; // Redirige a la pantalla final
    });

});

function sortear(participantes, exclusiones){
    let intento = 0;
    let maxIntentos = 1000; // Intentar generar un sorteo máximo 1000 veces
    // POrque por las exclusiones algunas combinaciones podrían ser invalidas
    while(intento < maxIntentos){
        let copia = [...participantes];
        // Se usa el algortimo Fisher-Yates para mezclar a los participantes
        for(let i=copia.length-1; i>0; i--){
            const j = Math.floor(Math.random()*(i+1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
        // Asi se crea el sorteo tomando los 2 arreglos
        let valido = true;
        let resultados = [];
        for(let i=0; i<participantes.length; i++){
            // Se recorre todo el arreglo viendo de quien a quien se da esa iteracion en el sorteo
            let de = participantes[i]; // Quien regala
            let para = copia[i]; // A quien le regala

            // no puede regalarse a sí mismo, se abandona el intento
            if(de === para){
                valido = false;
                break;
            }

            // validar exclusiones
            // Revisar si quien regala tiene alguna exclusion, 
            // y si si, revisa si la exclusion esta con quien le va a regalar
            if(exclusiones[de] && exclusiones[de].includes(para)){
                valido = false;
                break;
            }
            resultados.push({de, para}); // Se guarda el resultado valido
        }

        // Si todo salio bien se retorna el resultado
        if(valido){
            return resultados;
        }
        intento++;
    }

    return null;
}