const verConfigBtn = document.getElementById("verConfigBtn");
const verSorteoBtn = document.getElementById("verSorteoBtn");
const finalizarBtn = document.getElementById("finalizar");

const configDiv = document.getElementById("configuracionEvento");
const sorteoDiv = document.getElementById("sorteoEvento");

verConfigBtn.addEventListener("click", () => {

    configDiv.classList.toggle("d-none");
    sorteoDiv.classList.add("d-none");

    mostrarConfiguracion();
});

finalizarBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "Inicio.html";
} )


function mostrarConfiguracion(){
    const organizador = localStorage.getItem("organizador");
    const evento = localStorage.getItem("evento");
    const fecha = localStorage.getItem("fechaSorteo");
    const precio = localStorage.getItem("precioMaximo");
    const participantes = JSON.parse(localStorage.getItem("participantes")) || [];
    const exclusiones = JSON.parse(localStorage.getItem("exclusiones")) || {};

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
}

verSorteoBtn.addEventListener("click", () => {
    sorteoDiv.classList.toggle("d-none");
    configDiv.classList.add("d-none");
    mostrarSorteo();
});

function mostrarSorteo(){
    const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
    sorteoDiv.innerHTML = resultados.map(r => `
        <div class="card participante-card m-2 p-3 text-center">
            <div class="front">
                ${r.de}
            </div>
            <div class="back d-none">
                Da a: ${r.para}
            </div>
        </div>
    `).join("");

    activarVolteo();
}

function activarVolteo(){
    document.querySelectorAll(".participante-card")
    .forEach(card => {

        card.addEventListener("click", function(){
            const front = this.querySelector(".front");
            const back = this.querySelector(".back");
            front.classList.add("d-none");
            back.classList.remove("d-none");
            setTimeout(() => {
                front.classList.remove("d-none");
                back.classList.add("d-none");
            }, 2000);
          });
    });

}