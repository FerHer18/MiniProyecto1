const verConfigBtn = document.getElementById("verConfigBtn");
const verSorteoBtn = document.getElementById("verSorteoBtn");
const finalizarBtn = document.getElementById("finalizar");

const configDiv = document.getElementById("configuracionEvento");
const sorteoDiv = document.getElementById("sorteoEvento");

verConfigBtn.addEventListener("click", () => {
    configDiv.classList.toggle("d-none"); // Toggle para agregar o quitar una clase
    sorteoDiv.classList.add("d-none");

    mostrarConfiguracion();
});
 
finalizarBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
} ) 

function mostrarConfiguracion(){
    // Obtener los datos del localStorage que habian sido guardados
    const organizador = localStorage.getItem("organizador");
    const evento = localStorage.getItem("evento");
    const fecha = localStorage.getItem("fechaSorteo");
    const precio = localStorage.getItem("precioMaximo");

    // Se convierte a objeto de javascript ya que fue guardado como texto
    const participantes = JSON.parse(localStorage.getItem("participantes")) || [];
    // Se obtienen las exclusiones que se guardaron tipo "Fer" : ["Vale"] (fer no el puede regalar a Vale)
    const exclusiones = JSON.parse(localStorage.getItem("exclusiones")) || {};

    // Se muestran  los datos del sorteo
    configDiv.innerHTML = `
        <h5>Organizador:</h5> ${organizador || "No definido"} <br><br>
        <h5>Celebración:</h5> ${evento} <br><br>
        <h5>Fecha:</h5> ${fecha} <br><br>
        <h5>Presupuesto:</h5> ${precio ? "$" + precio : "Sin límite"} <br><br>
        <h5>Participantes:</h5>
        <ul>
            ${participantes.map(p => `<li>${p}</li>`).join("")}
        </ul>
        <h5>Exclusiones:</h5>
        <ul>
            ${Object.keys(exclusiones).length ? Object.entries(exclusiones).map(([de, lista]) => lista.map(para => `<li>${de} X ${para}</li>`).join("")).join(""): "<li>Ninguna</li>"}
        </ul>
    `;
    // Las exlusiones se convierten en HTML sacando los objetos del map para que quede asi: Fer X Vale
}

verSorteoBtn.addEventListener("click", () => {
    sorteoDiv.classList.toggle("d-none");
    configDiv.classList.add("d-none");
    mostrarSorteo();
});

// Se crea la estructura para ver el sorteo con una area donde iran todos los nombres 
// y otra donde se veran los resultados
function mostrarSorteo(){
    const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
    sorteoDiv.innerHTML = `
        <div class="row">
            <div class="col-6" id="listaDrag"></div>
            <div class="col-6">
                <div id="zonaRevelado" class="drop-area">
                    Arrastra aquí para conocer quien te toco en el sorteo
                </div>
                <div id="resultadoMostrado" class="mt-3"></div>
            </div>
        </div>
    `;

    const lista = document.getElementById("listaDrag");
    resultados.forEach(r => {
        lista.innerHTML += `
            <div class="participante-card m-2 p-3 text-center"
                 draggable="true"
                 data-nombre="${r.de}">
                 ${r.de}
            </div>
        `;
    });

    activarDragAndDrop(resultados);
}

function activarDragAndDrop(resultados){
    const zonaRevelado = document.getElementById("zonaRevelado");
    const lista = document.getElementById("listaDrag");
    document.querySelectorAll(".participante-card")
    .forEach(card => {
        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", card.dataset.nombre);
        });
    });

    zonaRevelado.addEventListener("dragover", (e) => {
        e.preventDefault();
        zonaRevelado.classList.add("activa");
    });

    zonaRevelado.addEventListener("dragleave", () => {
        zonaRevelado.classList.remove("activa");
    });

    zonaRevelado.addEventListener("drop", (e) => {
        e.preventDefault();
        zonaRevelado.classList.remove("activa");
        const nombre = e.dataTransfer.getData("text/plain");
        const persona = resultados.find(r => r.de === nombre);

        const cardOriginal = document.querySelector(`[data-nombre="${nombre}"]`);

        // mover la card
        zonaRevelado.appendChild(cardOriginal);

        // mostrar resultado dentro de la zona
        const resultadoDiv = document.createElement("div");
        resultadoDiv.classList.add("mt-3", "alert", "info");
        resultadoDiv.innerHTML = `
            <strong>${persona.de}</strong> le regala a 
            <strong>${persona.para}</strong> 
        `;

        zonaRevelado.appendChild(resultadoDiv);

        // después de 3 segundos regresar todo
        setTimeout(() => {
            lista.appendChild(cardOriginal);
            resultadoDiv.remove();
        }, 3000);
    });
}