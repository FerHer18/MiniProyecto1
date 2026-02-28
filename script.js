function agregarParticipante(){
    let nombreInput = document.getElementById("nombre");
    let nombre = nombreInput.value.trim();

    if(nombre === "") return;
    let lista = document.getElementById("lista-participantes");
    let item = document.createElement("div");
    item.classList.add("participante-item");

    item.innerHTML = `
        <input type="text" value="${nombre}" class="participante-nombre">
        <button class="btn-eliminar" onclick="this.parentElement.remove()">×</button>
    `;
    lista.appendChild(item);
    nombreInput.value = "";
}

function establecerExclusiones() {
    const exclusiones = document.getElementById('exclusiones').value.trim();
    localStorage.setItem('exclusiones', exclusiones);

    let participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    participantes.push(nombre);
    localStorage.setItem('participantes', JSON.stringify(participantes));
    
    nombreInput.value = '';
}