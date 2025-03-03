const textareaParticipantes = document.getElementById("participantes")
const alertaError = document.querySelector(".alerta");
const formSorteo = document.querySelector(".contenedor-sorteo");
const contenedorParticipantes = document.querySelector(".participantes-container")
const listaDeParticipantes = document.querySelector(".lista-participantes");
const totalParticipantes = document.getElementById("numero-participantes");
const botonMezclar = document.getElementById("chocolateo");
const botonIniciarSorteo = document.getElementById("iniciar-sorteo");
const contenedorContador = document.querySelector(".container-contador");
const contador = document.getElementById("counter");
const contenedorGanadores = document.querySelector(".ganadores-container");
const listaGanadores = document.querySelector(".ganadores-li");
const botonLimpiar = document.getElementById("limpiar");
const botonAyuda = document.getElementById("ayuda");
const contenedorAyuda = document.querySelector(".box-ayuda")
const botonCuadro = document.getElementById("btncuadro");
 

let participantesLi;

botonCuadro.addEventListener("click", () => mostrarCuadroEliminatoria());
botonAyuda.addEventListener("click", () => mostrarAyuda());
botonLimpiar.addEventListener("click", () => limpiarListaParticipantes());
botonIniciarSorteo.addEventListener("click", () => iniciarContador());
botonMezclar.addEventListener("click", () => chocolatearParticipantes());


document.addEventListener("submit", e => {
    e.preventDefault();
    validarParticipantes();
})

function validarParticipantes() {
    const participantesValidos = textareaParticipantes.value.split("\n").
        map(linea => linea.trim())
        .filter(linea => linea != "");


    if (participantesValidos.length < 2) {
        mostrarAlertaError("Agregar mas participantes");
        return;
    }

    textareaParticipantes.style.border = "solid thin #d2d6dc";
    iniciarSorteo(participantesValidos);

}

function iniciarSorteo(participantesValidos) {
    formSorteo.style.display = "none";
    contenedorParticipantes.style.display = "block";
    participantesLi = [...participantesValidos]

    actualizarListaParticipantes(participantesLi);
    totalParticipantes.textContent = participantesLi.length;


}


function actualizarListaParticipantes(participantes) {
    listaDeParticipantes.innerHTML = "";
    participantes.forEach(participante => {
        const itemParticipante = document.createElement("li");
        itemParticipante.textContent = participante;
        listaDeParticipantes.appendChild(itemParticipante);
    });
}




function chocolatearParticipantes() {
    listaDeParticipantes.innerHTML = "";
    for (let i = participantesLi.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i * 1));

        [participantesLi[i], participantesLi[j]] = [participantesLi[j]
            , participantesLi[i]]
    }


    actualizarListaParticipantes(participantesLi)
}

function iniciarContador() {
    let numeroContador = parseInt(counter.textContent);
    contenedorParticipantes.style.display = "none";
    contenedorContador.style.display = "block";

    const interValidId = setInterval(() => {
        numeroContador--;
        counter.textContent = numeroContador
        if (numeroContador < 1) {
            clearInterval(interValidId);
            mostrarGanadores();
        }
    }, 1000);
}


function mostrarGanadores() {
    contenedorContador.style.display = "none";
    contenedorGanadores.style.display = "block";

    let ganadores = [];

    while (participantesLi.length > 0) {
        let indiceAleatorio = Math.floor(Math.random() * participantesLi.length)
        let ganador = participantesLi[indiceAleatorio];

        ganadores.push(ganador);
        participantesLi.splice(indiceAleatorio, 1)

    }
localStorage.setItem("ganadores",JSON.stringify(ganadores));


    ganadores.forEach((ganador, indice) => {
        const itemGanador = document.createElement("li");
        const etiquetaNumero = document.createElement("span");
        const etiquetaNombre = document.createElement("p");

        etiquetaNumero.textContent = indice + 1;
        etiquetaNombre.textContent = ganador;
        etiquetaNombre.prepend(etiquetaNumero);

        itemGanador.appendChild(etiquetaNombre);
        listaGanadores.appendChild(itemGanador);

    });



}




function mostrarAlertaError(mensaje) {

    alertaError.classList.add("active");
    alertaError.textContent = mensaje;
    textareaParticipantes.style.border = "solid 2px #dc2545";

    setTimeout(() => {
        alertaError.classList.remove("active");
    }, 3000);


}

function limpiarListaParticipantes() {

    textareaParticipantes.value = "";
    participantesLi = [];
}


function mostrarAyuda() {

    formSorteo.style.display = "none";
    contenedorAyuda.style.display = "block";

}


function mostrarCuadroEliminatoria(){

    window.location.href="eliminatoria.html";
}


window.onload = function GuardarDatos() {
    // Recuperamos los ganadores almacenados en localStorage (suponiendo que los ganadores son un array)
    let ganadores = JSON.parse(localStorage.getItem('ganadores'));

 // Comprobamos si hay ganadores
 if (ganadores && ganadores.length > 0) {
    // Asumimos que los ganadores son los elementos que deben ir en los divs

 // Accedemos a los divs donde queremos colocar los resultados (ajusta los selectores según tus necesidades)
 let divs = [
    document.querySelector('.casilla-uno'),
    document.querySelector('.casilla-dos'),
    document.querySelector('.casilla-nueve'),
    document.querySelector('.casilla-diez'),
    document.querySelector('.casilla-semifinal'),
    document.querySelector('.casilla-final')
    // Agrega más divs si los necesitas
];

// Insertamos los ganadores uno por uno en los divs
ganadores.forEach((ganador, index) => {
    if (divs[index]) {
        let p = document.createElement('h1');
        p.textContent = ganador;  // Asignamos el nombre del ganador al elemento <p>
        divs[index].appendChild(p);  // Agregamos el <h1> dentro del div correspondiente
    }
});
} else {
console.log("No hay ganadores para mostrar.");
}
}




















