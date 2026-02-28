function agregarParticipante() {
    const nombreInput = document.getElementById('nombre');
    const nombre = nombreInput.value.trim();

    if (!nombre) return;
    const lista = document.getElementById('lista-participantes');

    const div = document.createElement('div');
    div.classList.add('participante-item');

    div.innerHTML = `<span>${nombre}</span><button class="btn-eliminar" onclick="this.parentElement.remove()">×</button>`;

    lista.appendChild(div);

    let participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    participantes.push(nombre);
    localStorage.setItem('participantes', JSON.stringify(participantes));
    
    nombreInput.value = '';
}