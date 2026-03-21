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
const btnChocolateo = document.getElementById('chocolateo');

// Variables de la Ruleta
const btnRuleta = document.getElementById('btn-ruleta');
const modal = document.getElementById('modal-ruleta');
const cerrar = document.querySelector('.cerrar-modal');
const btnGirar = document.getElementById('girar-ruleta');
const canvas = document.getElementById('canvas-ruleta');
const ctx = canvas.getContext('2d');

// 1. DEFINIR COLORES (Faltaba esta variable)
// 1. DEFINIR COLORES (Faltaba esta variable)
const colors = ["#1f6feb", "#0d419d", "#238636", "#0969da", "#161b22"];

const equiposFifa = [
    {  logo: "img/clubes-logo/Real_Madrid_CF.svg" },
    { nombre: "Barcelona", logo: "img/clubes-logo/FC_Barcelona_(crest).svg" },
    { nombre: "Atletico de Madrid", logo: "img/clubes-logo/Logo_Atlético_Madrid_2017.svg" },
    { nombre: "PSG", logo: "img/clubes-logo/Paris_Saint-Germain_F.C..svg" },
    { nombre: "Villareal", logo: "img/clubes-logo/Logo_Villarreal_CF_2009.svg" },
    { nombre: "Lyon", logo: "img/clubes-logo/france_lyon.football-logos.cc.svg" },
    { nombre: "Marsella", logo: "img/clubes-logo/Olympique_Marseille_logo.svg" },
    { nombre: "Fiorentina", logo: "img/clubes-logo/ACF_Fiorentina_-_logo_(Italy,_2022).svg" },
    { nombre: "Inter de Milan", logo: "img/clubes-logo/FC_Internazionale_Milano_2021.svg" },
    { nombre: "Milan", logo: "img/clubes-logo/Logo_of_AC_Milan.svg" },
    { nombre: "Atalanta", logo: "img/clubes-logo/Logo_Atalanta_Bergamo.svg" },
    { nombre: "Roma", logo: "img/clubes-logo/italy_roma.football-logos.cc.svg" },
    { nombre: "Juventus", logo: "img/clubes-logo/Juventus_FC_-_logo_black_(Italy,_2017).svg" },
    { nombre: "Napoles", logo: "img/clubes-logo/SSC_Neapel.svg" },
    { nombre: "Monaco", logo: "img/clubes-logo/france_as-monaco.football-logos.cc.svg" },
        { nombre: "Bayern Munchen", logo: "img/clubes-logo/Logo_FC_Bayern_München_(2002–2017).svg" },
    { nombre: "Borussia", logo: "img/clubes-logo/Borussia_Dortmund_logo.svg" },
    { nombre: "Bayer Leverkusen", logo: "img/clubes-logo/Bayer_04_Leverkusen_logo.svg" },
    { nombre: "Arsenal", logo: "img/clubes-logo/Arsenal_FC.svg" },
        { nombre: "Man. United", logo: "img/clubes-logo/Manchester_United_FC_crest.svg" },
    { nombre: "Man.City", logo: "img/clubes-logo/Manchester_City_FC_badge.svg" },
    { nombre: "Liverpool", logo: "img/clubes-logo/england_liverpool.football-logos.cc.svg" },
    { nombre: "Chelsea", logo: "img/clubes-logo/Chelsea_FC.svg" },
    { nombre: "Totenham", logo: "img/clubes-logo/Tottenham_Hotspur.svg" },
    { nombre: "Aston Villa", logo: "img/clubes-logo/Aston_Villa_FC_logo.svg" },
    { nombre: "Newcastle", logo: "img/clubes-logo/Newcastle_United_Logo.svg" },
    { nombre: "Leipzig", logo: "img/clubes-logo/VEREINFACHTES_LOGO_-_RB_Leipzig.svg" },



];

// Pre-carga de imágenes
const imagenesCargadas = {};
let imagenesListas = 0;

equiposFifa.forEach(equipo => {
    const img = new Image();
    img.src = equipo.logo;
    img.onload = () => {
        imagenesListas++;
        if (imagenesListas === equiposFifa.length) {
            console.log("Logos cargados");
        }
    };
    imagenesCargadas[equipo.nombre] = img;
});

// Variables de Turno
let indiceTurno = 0;

// Abrir y cerrar modal
btnRuleta.onclick = () => { 
    modal.style.display = "flex"; 
    // Recuperamos participantes para los turnos
    const gans = JSON.parse(localStorage.getItem("ganadores")) || [];
    if(gans.length > 0) {
        document.getElementById('turno-jugador').innerText = "Turno de: " + gans[0];
    }
    dibujar(); 
};

cerrar.onclick = () => { modal.style.display = "none"; };

function dibujar() {
    if (!canvas) return;
    const centro = canvas.width / 2;
    const arco = (2 * Math.PI) / equiposFifa.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    equiposFifa.forEach((equipo, i) => {
        const angulo = i * arco;

        // Dibujar el segmento
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(centro, centro);
        ctx.arc(centro, centro, centro, angulo, angulo + arco);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.stroke();

        // Dibujar Texto y Logo
        ctx.save();
        ctx.translate(centro, centro);
        ctx.rotate(angulo + arco / 2);

        // Nombre
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 12px Montserrat";
        ctx.fillText(equipo.nombre, centro - 65, 5);

        // Logo
        const imgLogo = imagenesCargadas[equipo.nombre];
        if (imgLogo && imgLogo.complete) {
            ctx.drawImage(imgLogo, centro - 55, -15, 30, 30); 
        }

        ctx.restore();
    });

    // Centro decorativo
    ctx.beginPath();
    ctx.arc(centro, centro, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "#161b22";
    ctx.fill();
}

btnGirar.onclick = () => {
    const gans = JSON.parse(localStorage.getItem("ganadores")) || [];
    
    // 1. Validar que queden jugadores y equipos
    if (indiceTurno >= gans.length) {
        document.getElementById('equipo-ganador').innerText = "¡Sorteo finalizado!";
        return;
    }
    if (equiposFifa.length === 0) {
        alert("¡Se acabaron los equipos disponibles!");
        return;
    }

    const rotation = Math.floor(Math.random() * 360) + 3600; 
    canvas.style.transition = "transform 4s cubic-bezier(0.1, 0, 0.2, 1)";
    canvas.style.transform = `rotate(${rotation}deg)`;
    
    btnGirar.disabled = true;

    setTimeout(() => {
        const realDeg = rotation % 360;
        // Calculamos cuál cayó
        const itemIndex = Math.floor((360 - realDeg) / (360 / equiposFifa.length)) % equiposFifa.length;
        const equipoGanado = equiposFifa[itemIndex];

        // 2. Mostrar resultado
        document.getElementById('equipo-ganador').innerText = `${gans[indiceTurno]} se lleva al ${equipoGanado.nombre}!`;

        // 3. EL TRUCO: Quitamos el equipo del array para que no vuelva a salir
        equiposFifa.splice(itemIndex, 1);

        // 4. Preparar siguiente turno
        indiceTurno++;
        btnGirar.disabled = false;

        if (indiceTurno < gans.length) {
            document.getElementById('turno-jugador').innerText = "Turno de: " + gans[indiceTurno];
            
            // 5. Redibujar la ruleta con los equipos que QUEDAN
            // Ponemos un pequeño delay para que se vea el cambio después de la emoción
            setTimeout(() => {
                canvas.style.transition = "none"; // Quitamos la transición para resetear posición
                canvas.style.transform = `rotate(0deg)`;
                dibujar(); // Volvemos a dibujar la ruleta con 1 equipo menos
            }, 2000);
            
        } else {
            document.getElementById('turno-jugador').innerText = "¡Todos tienen equipo!";
            btnGirar.style.display = "none"; // Escondemos el botón al terminar
        }
    }, 4000);
};
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


    if (participantesValidos.length < 8) {
        mostrarAlertaError("Agrega minimo 8 participantes");
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
    participantes.forEach((participante, indice) => {
        const itemParticipante = document.createElement("li");
        
        // Creamos el círculo con el número
        const etiquetaNumero = document.createElement("span");
        etiquetaNumero.textContent = indice + 1;
        
        // Creamos el contenedor del nombre
        const etiquetaNombre = document.createElement("p");
        etiquetaNombre.textContent = participante;

        // Metemos el número dentro del p y el p dentro del li
        etiquetaNombre.prepend(etiquetaNumero);
        itemParticipante.appendChild(etiquetaNombre);
        
        listaDeParticipantes.appendChild(itemParticipante);
    });
}

// 2. Escuchamos el clic
btnChocolateo.addEventListener('click', () => {
    // Aquí usamos el array donde guardas tus participantes (ejemplo: listaNombres)
    if (listaNombres.length > 0) {
        // Mezclamos el array (Algoritmo Fisher-Yates)
        listaNombres.sort(() => Math.random() - 0.5);
        
        // Llamamos a la función que renderiza la lista en el HTML
        renderizarParticipantes(); 
        
        // Opcional: Una pequeña animación de rotación al ícono
        btnChocolateo.style.transform = 'rotate(360deg)';
        btnChocolateo.style.transition = 'transform 0.5s';
        setTimeout(() => btnChocolateo.style.transform = 'rotate(0deg)', 500);
    }
});

function chocolatearParticipantes() {
    for (let i = participantesLi.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [participantesLi[i], participantesLi[j]] = [participantesLi[j], participantesLi[i]];
    }
    actualizarListaParticipantes(participantesLi);
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
    const etiquetaNombre = document.createElement("p");
    const etiquetaNumero = document.createElement("span");

    etiquetaNumero.textContent = indice + 1;
    etiquetaNombre.textContent = ganador;
    
    // IMPORTANTE: Primero el número, luego el nombre
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
    document.querySelector('.casilla-tres'),
    document.querySelector('.casilla-cuatro'),
    document.querySelector('.casilla-cinco'),
    document.querySelector('.casilla-seis'),
    document.querySelector('.casilla-siete'),
    document.querySelector('.casilla-ocho'),
    document.querySelector('.casilla-nueve'),
    document.querySelector('.casilla-diez'),
    document.querySelector('.casilla-once'),
    document.querySelector('.casilla-doce'),
    document.querySelector('.casilla-trece'),
    document.querySelector('.casilla-catorce'),
    document.querySelector('.casilla-quince'),
    document.querySelector('.casilla-diesiseis')

    // Agrega más divs si los necesitas
];

// Insertamos los ganadores uno por uno en los divs
ganadores.forEach((ganador, index) => {
    if (divs[index]) {
        let p = document.createElement('p');
        p.textContent = ganador;  // Asignamos el nombre del ganador al elemento <p>
        divs[index].appendChild(p);  // Agregamos el <h1> dentro del div correspondiente
    }
});
} else {
console.log("No hay ganadores para mostrar.");
}
}



















