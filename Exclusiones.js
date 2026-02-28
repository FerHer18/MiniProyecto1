function mostrarExclusiones() {
    const participantes = JSON.parse(localStorage.getItem('participantes')) || [];
    const lista = document.getElementById('listaParticipantes');
    const guardarExclusionesBtn = document.getElementById('guardarExclusionesBtn');
    const bottons = document.getElementById('bottons');

    bottons.style.display = 'none';
    guardarExclusionesBtn.classList.remove('d-none');
    
    participantes.forEach((personas,index) => {
        const div = document.createElement('div');
        div.classList.add('mb-3');

        const boton = document.createElement('button');
        boton.classList.add('btn', 'btn-secondary', 'mb-2');
        boton.setAttribute('data-bs-toggle', 'collapse');
        boton.setAttribute('data-bs-target', `#exclusiones${index}`);
        boton.textContent = personas + " ▼";

        div.appendChild(boton);

        const collapseDiv = document.createElement('div');
        collapseDiv.classList.add('collapse');
        collapseDiv.id = `exclusiones${index}`;

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
                collapseDiv.appendChild(checDiv);
            }
        });

        div.appendChild(collapseDiv);
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
    window.location.href = 'ConfiguracionesSorteo.html';
}