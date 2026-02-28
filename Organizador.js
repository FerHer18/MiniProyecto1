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
        alert("El organizador participará en el intercambio");
    }else{
        alert("El organizador no participará en el intercambio");
    }
}