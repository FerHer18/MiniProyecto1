function mostrarPregunta(){
    let nombre = document.getElementById("organizador").value;
    let box = document.getElementById("participarBox");
    
    if(nombre.trim() !== ""){
        box.classList.remove("d-none");
    }else{
        box.classList.add("d-none");
    }
}

function setParticipacion(valor){
    if(valor){
        Swal.fire("El organizador participará en el intercambio");
    }else{
        Swal.fire("El organizador no participará en el intercambio");
    }
}