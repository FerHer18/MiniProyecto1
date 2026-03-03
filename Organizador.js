function mostrarPregunta(){
    let nombre = document.getElementById("organizador").value;
    let box = document.getElementById("participarBox");
    
    if(nombre.trim() !== ""){
        box.classList.remove("d-none");
        localStorage.setItem("organizador", nombre.trim());
    }else{
        box.classList.add("d-none");
        localStorage.removeItem("organizador");
    }
}

function setParticipacion(valor){
    localStorage.setItem("organizadorParticipa", valor); 
    if(valor){
        Swal.fire("El organizador participará en el intercambio");
    }else{
        Swal.fire("El organizador no participará en el intercambio");
    }
}

function continuar(){
    const nombre = localStorage.getItem("organizador");
    const participa = localStorage.getItem("organizadorParticipa");
    if(!nombre){
        Swal.fire("Debes ingresar el nombre del organizador");
        return;
    }

    if(participa === null){
        Swal.fire("Debes elegir si el organizador participará");
        return;
    }
    
    //TENEMOS NUEVAMENTE LA LISTA
    let participantes = JSON.parse(localStorage.getItem("participantes")) || [];

    //EN CASO DE SI VAYA A PARTICIPAR, EL CAMPO SE COLOCA EN TRUE Y SI NO ESTÁ EN LA LISTA, LO AGREGAMOS
    if(participa === "true"){
        if(!participantes.includes(nombre)){
            participantes.push(nombre);
        }
    }else{
        //EN CASO DE QUE NO PARTICIPE Y ESTABA ANTES, SE ELIMINA
        participantes = participantes.filter(p => p !== nombre);
    }

    localStorage.setItem("participantes", JSON.stringify(participantes));

    window.location.href = "ListaParticipantes.html";
}