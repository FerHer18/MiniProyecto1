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

    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split("T")[0];

    fechaInput.min = fechaHoy;



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
        btn.className = "btn btn-outline-success btn-sm";
        btn.textContent = dias + " días (" + fechaBonita + ")";

        btn.addEventListener("click", function () {

            fechaInput.value = fechaFormato;
            localStorage.setItem("fechaSorteo", fechaFormato);

            document.querySelectorAll("#fechasSugeridas button")
                .forEach(b => {
                    b.classList.remove("btn-success");
                    b.classList.add("btn-outline-success");
                });

            this.classList.remove("btn-outline-success");
            this.classList.add("btn-success");

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

        for (let i = participantes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [participantes[i], participantes[j]] = [participantes[j], participantes[i]];
        }

        const resultados = [];

        for (let i = 0; i < participantes.length; i++) {
            const regalador = participantes[i];
            const receptor = participantes[(i + 1) % participantes.length];

            resultados.push({
                de: regalador,
                para: receptor
            });
        }

        localStorage.setItem("resultados", JSON.stringify(resultados));

        alert("Intercambio realizado con éxito");

        console.log(resultados);
    });

});