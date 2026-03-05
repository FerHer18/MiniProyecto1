function agregarParticipante(){
    let nombreInput = document.getElementById("nombre");
    let nombre = nombreInput.value.trim();

    if(nombre === "") return;
    let lista = document.getElementById("lista-participantes");
    let item = document.createElement("div");
    item.classList.add("participante-item");

    item.innerHTML = `
        <input type="text" value="${nombre}" class="participante-nombre">
        <button class="btn-eliminar" onclick="eliminarParticipante(this)">×</button>
    `;
    lista.appendChild(item);

    let participantes = JSON.parse(localStorage.getItem("participantes")) || [];
    participantes.push(nombre);
    localStorage.setItem("participantes",JSON.stringify(participantes));
    nombreInput.value = "";
} 

this.parentElement.remove()

function eliminarParticipante(usuario){
    let contenedor = usuario.parentElement; // obtener el div del participante
    let nombre = contenedor.querySelector(".participante-nombre").value; // obtener el nombre del input
    contenedor.remove(); // eliminar del DOM
    let participantes = JSON.parse(localStorage.getItem("participantes")) || []; // obtener participantes del localStorage
    participantes = participantes.filter(p => p !== nombre); // eliminar el nombre del arreglo
    localStorage.setItem("participantes", JSON.stringify(participantes)); // guardar nuevamente
}