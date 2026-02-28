function mostrarExclusiones() {
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    const lista = document.getElementById('listaParticipantes');
    const guardarExclusionesBtn = document.getElementById('guardarExclusionesBtn');
    const bottons = document.getElementById('bottons');

    bottons.style.display = 'none';
    guardarExclusionesBtn.classList.remove('d-none');
    
    participantes.forEach(personas => {
        const div = document.createElement('div');
        div.classList.add('mb-3');

        const titulo = document.createElement('h5');
        titulo.textContent = personas + ' No sorteará a:';
        div.appendChild(titulo);

        participantes.forEach(excluido => {
            if (excluido !== personas) {
                const checDiv = document.createElement('div');
                checDiv.classList.add('form-check');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add('form-check-input');
                checkbox.name=personas;
                checkbox.value = excluido;

                const label = document.createElement('label');
                label.classList.add('form-check-label');
                label.textContent = excluido;

                checDiv.appendChild(checkbox);
                checDiv.appendChild(label);
                div.appendChild(checDiv);
            }
        });

        lista.appendChild(div);
    });
}


function guardarExclusiones() {
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    let exclusiones = {};
    
    participantes.forEach(persona => {
        const checkboxes = document.querySelectorAll(`input[name="${persona}"]:checked`);
        if(checkboxes.length > 0) {
            exclusiones[persona] = [];
            checkboxes.forEach(checkbox => {
                exclusiones[persona].push(checkbox.value);
            });
        }
    });
    localStorage.setItem('exclusiones', JSON.stringify(exclusiones));
}