function agregarParticipante() {
    const nombreInput = document.getElementById('nombre');
    const nombre = nombreInput.value.trim();

    if (!nombre) return;
    const lista = document.getElementById('lista-participantes');

    const div = document.createElement('div');
    div.classList.add('participante-item');

    div.innerHTML = `<span>${nombre}</span><button class="btn-eliminar" onclick="this.parentElement.remove()">×</button>`;

    lista.appendChild(div);
    nombreInput.value = '';
}

function establecerExclusiones() {
    const exclusiones = document.getElementById('exclusiones').value.trim();
    localStorage.setItem('exclusiones', exclusiones);

    if(nombre === '') {
        alert('Por favor, ingresa al menos un participante para establecer exclusiones.');
        return;
    }
    
    const lista = document.getElementById('lista-participantes');
    const participantes = Array.from(lista.children).map(item => item.querySelector('span').textContent);
    localStorage.setItem('participantes', JSON.stringify(participantes));

    div.innerHTML = `<span>${nombre}</span><button class="btn-eliminar" onclick="this.parentElement.remove()">×</button>`;
    div.querySelector('.btn-eliminar').addEventListener('click', function() {
        this.parentElement.remove();
    });
    
    lista.appendChild(div);
    nombreInput.value = '';
}




document.getElementById('agregar').addEventListener('click', agregarParticipante);
document.getElementById('sortear').addEventListener('click', sortear);
