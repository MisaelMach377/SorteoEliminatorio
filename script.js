// --- SELECTORES EXISTENTES ---
const textareaParticipantes = document.getElementById("participantes");
const alertaError = document.querySelector(".alerta");
const formSorteo = document.querySelector(".contenedor-sorteo");
const contenedorParticipantes = document.querySelector(".participantes-container");
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
const contenedorAyuda = document.querySelector(".box-ayuda");
const botonCuadro = document.getElementById("btncuadro");

// --- VARIABLES DE LA RULETA Y MODAL ---
const btnRuleta = document.getElementById('btn-ruleta');
const modal = document.getElementById('modal-ruleta');
const cerrar = document.querySelector('.cerrar-modal');
const btnGirar = document.getElementById('girar-ruleta');
const canvas = document.getElementById('canvas-ruleta');
const ctx = canvas.getContext('2d');

const colors = ["#1f6feb", "#0d419d", "#238636", "#0969da", "#161b22"];

const equiposFifa = [
    { nombre: "Real Madrid", logo: "img/clubes-logo/Real_Madrid_CF.svg" },
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

// --- PRE-CARGA DE IMÁGENES ---
const imagenesCargadas = {};
let imagenesListas = 0;

equiposFifa.forEach(equipo => {
    const img = new Image();
    img.src = equipo.logo;
    img.onload = () => {
        imagenesListas++;
        if (imagenesListas === equiposFifa.length) console.log("Logos cargados");
    };
    imagenesCargadas[equipo.nombre] = img;
});

// --- LÓGICA DE LA RULETA (MODAL Y GIRO) ---
let indiceTurno = 0;
let rotacionAcumulada = 0;

btnRuleta.onclick = () => { 
    modal.style.display = "flex"; 
    const gans = JSON.parse(localStorage.getItem("ganadores")) || [];
    if(indiceTurno < gans.length) {
        document.getElementById('turno-jugador').innerText = "Turno de: " + gans[indiceTurno];
    }
    setTimeout(dibujar, 100); 
};

cerrar.onclick = () => { modal.style.display = "none"; };

function dibujar() {
    if (!canvas) return;
    const centro = canvas.width / 2;
    // radioSorteo nos da un margen de seguridad para que los logos no toquen el borde
    const radioSorteo = centro - 15; 
    const arco = (2 * Math.PI) / equiposFifa.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    equiposFifa.forEach((equipo, i) => {
        const angulo = i * arco;

        // 1. Dibujar el segmento (Fondo de color)
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(centro, centro);
        // Usamos radioSorteo para dejar el margen
        ctx.arc(centro, centro, radioSorteo, angulo, angulo + arco); 
        ctx.fill();
        
        // Línea divisoria muy sutil
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // 2. Dibujar el ESCUDO (Más pequeño y centrado en el arco)
        ctx.save();
        ctx.translate(centro, centro);
        ctx.rotate(angulo + arco / 2);

        const imgLogo = imagenesCargadas[equipo.nombre];
        if (imgLogo && imgLogo.complete) {
            // FIX: Tamaño mucho más pequeño para 27 equipos
            // Pasamos de 35px a 22px para que no se amontonen
            const tamañoLogo = 22; 
            
            // FIX: Posición centrada en la rebanada
            // radioSorteo * 0.75 aleja el logo del centro pero lo mantiene dentro
            // -tamañoLogo / 2 centra el logo verticalmente respecto a la línea de rotación
            ctx.drawImage(imgLogo, radioSorteo * 0.75, -tamañoLogo / 2, tamañoLogo, tamañoLogo); 
        }

        ctx.restore();
    });

    // 3. Centro decorativo (Minimalista)
    ctx.beginPath();
    ctx.arc(centro, centro, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "#161b22";
    ctx.fill();
    ctx.strokeStyle = "#30363d";
    ctx.lineWidth = 3;
    ctx.stroke();
}

btnGirar.onclick = () => {
    const gans = JSON.parse(localStorage.getItem("ganadores")) || [];
    if (indiceTurno >= gans.length || equiposFifa.length === 0) return;

    btnGirar.disabled = true;
    const giroExtra = Math.floor(Math.random() * 360) + 3600; 
    rotacionAcumulada += giroExtra; 

    canvas.style.transition = "transform 4s cubic-bezier(0.1, 0, 0.2, 1)";
    canvas.style.transform = `rotate(${rotacionAcumulada}deg)`;

    setTimeout(() => {
        const gradosReales = rotacionAcumulada % 360;
        const tamañoRebanada = 360 / equiposFifa.length;
        // Ajuste Flecha Arriba (270°)
        let anguloFlecha = (360 - gradosReales + 270) % 360;
        const itemIndex = Math.floor(anguloFlecha / tamañoRebanada) % equiposFifa.length;
        const equipoGanado = equiposFifa[itemIndex];

        // 1. Resultado Modal
      document.getElementById('equipo-ganador').innerHTML = `
    <div style="display:flex; flex-direction:column; align-items:center; gap:12px;">
        <span style="font-size:0.9rem; color: #8b949e;">A ${gans[indiceTurno]} le tocó:</span>
        <img src="${equipoGanado.logo}" style="width:70px; height:70px; filter: drop-shadow(0 0 15px rgba(255,255,255,0.3)); object-fit: contain;">
    </div>
`;

     // --- COPIAR Y REEMPLAZAR ESTE BLOQUE EXACTO ---

// 2. Actualización Lista de Cruces (ESTRUCTURA TOTALMENTE LIMPIA)
const listaItems = document.querySelectorAll(".ganadores-li li p");

if (listaItems[indiceTurno]) {
    const nombreParticipante = gans[indiceTurno];
    const nroTurno = indiceTurno + 1;

    // Generamos un HTML plano, sin contenedores extra, solo texto y el logo
    listaItems[indiceTurno].innerHTML = `
        <div style="display: flex; align-items: center; width: 100%; padding-left: 10px; background: none !important;">
            
            <span style="
                color: #ffffff; 
                font-family: monospace; 
                font-size: 0.9rem; 
                margin-right: 15px; 
                min-width: 25px; 
                text-align: right;
            ">${nroTurno}</span>

            <span style="
                color: #ffffff; 
                font-weight: 500; 
                font-size: 1rem; 
                margin-left: 20px;
                background: none !important;
                border: none !important;
                border-radius: 0 !important;
            ">
                ${nombreParticipante}
            </span>

            <span style="
                color: #ffffff; 
                margin: 0 15px; 
                font-weight: bold; 
                font-size: 1.1rem;
                background: none !important;
                border: none !important;
                border-radius: 0 !important;
            ">➔</span>

            <img src="${equipoGanado.logo}" style="
                width:30px; 
                height:30px; 
                object-fit:contain; 
                vertical-align:middle;
                filter: drop-shadow(0 0 5px rgba(255,255,255,0.1));
            ">
        </div>
    `;
    
    // Limpiamos el contenedor padre (el <p>) de cualquier círculo previo
    const pContainer = listaItems[indiceTurno];
    pContainer.style.background = "none";
    pContainer.style.border = "none";
    pContainer.style.borderRadius = "0";

    // Estilo de la FILA COMPLETA (el <li>, no el círculo del nombre)
    const parentLi = listaItems[indiceTurno].parentElement;
    parentLi.style.background = "rgba(255, 255, 255, 0.05)"; 
    parentLi.style.borderColor = "rgba(255, 255, 255, 0.1)";
    parentLi.style.borderRadius = "8px"; // Bordes suaves de la fila
    parentLi.style.padding = "0"; // Reiniciamos padding para usar el del div flex
}
        // ELIMINAR EL EQUIPO PARA QUE NO REPITA
        equiposFifa.splice(itemIndex, 1);
        
        // PASAR AL SIGUIENTE TURNO
        indiceTurno++;
        btnGirar.disabled = false;

        // VERIFICAR SI CONTINUAMOS
        if (indiceTurno < gans.length && equiposFifa.length > 0) {
            document.getElementById('turno-jugador').innerText = "Turno de: " + gans[indiceTurno];
            // Redibujamos la ruleta con un equipo menos
            setTimeout(dibujar, 500); 
        } else {
            document.getElementById('turno-jugador').innerText = "¡Sorteo finalizado!";
            btnGirar.style.display = "none";
            // Dibujamos una última vez para que la ruleta no quede vacía o mal cortada
            dibujar(); 
        }
    }, 4000); // Tiempo que dura el giro
};

// --- LÓGICA DE PARTICIPANTES Y SORTEO INICIAL ---
let participantesLi = [];

botonCuadro.addEventListener("click", () => window.location.href="eliminatoria.html");
botonAyuda.addEventListener("click", () => {
    formSorteo.style.display = "none";
    contenedorAyuda.style.display = "block";
});
botonLimpiar.addEventListener("click", () => {
    textareaParticipantes.value = "";
    participantesLi = [];
});
botonIniciarSorteo.addEventListener("click", iniciarContador);
botonMezclar.addEventListener("click", chocolatearParticipantes);

document.addEventListener("submit", e => {
    e.preventDefault();
    validarParticipantes();
});

function validarParticipantes() {
    const participantesValidos = textareaParticipantes.value.split("\n")
        .map(linea => linea.trim())
        .filter(linea => linea != "");

    if (participantesValidos.length < 8) {
        mostrarAlertaError("Agrega mínimo 8 participantes");
        return;
    }
    iniciarSorteo(participantesValidos);
}

function iniciarSorteo(participantesValidos) {
    formSorteo.style.display = "none";
    contenedorParticipantes.style.display = "block";
    participantesLi = [...participantesValidos];
    actualizarListaParticipantes(participantesLi);
    totalParticipantes.textContent = participantesLi.length;
}

function actualizarListaParticipantes(participantes) {
    listaDeParticipantes.innerHTML = "";
    participantes.forEach((participante, indice) => {
        const itemParticipante = document.createElement("li");
        const etiquetaNombre = document.createElement("p");
        const etiquetaNumero = document.createElement("span");
        etiquetaNumero.textContent = indice + 1;
        etiquetaNombre.textContent = participante;
        etiquetaNombre.prepend(etiquetaNumero);
        itemParticipante.appendChild(etiquetaNombre);
        listaDeParticipantes.appendChild(itemParticipante);
    });
}

function chocolatearParticipantes() {
    for (let i = participantesLi.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [participantesLi[i], participantesLi[j]] = [participantesLi[j], participantesLi[i]];
    }
    actualizarListaParticipantes(participantesLi);
    botonMezclar.style.transform = 'rotate(360deg)';
    botonMezclar.style.transition = 'transform 0.5s';
    setTimeout(() => botonMezclar.style.transform = 'rotate(0deg)', 500);
}

function iniciarContador() {
    let numeroContador = parseInt(contador.textContent);
    contenedorParticipantes.style.display = "none";
    contenedorContador.style.display = "block";

    const interValidId = setInterval(() => {
        numeroContador--;
        contador.textContent = numeroContador;
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
    let copiaParticipantes = [...participantesLi];

    while (copiaParticipantes.length > 0) {
        let indiceAleatorio = Math.floor(Math.random() * copiaParticipantes.length);
        ganadores.push(copiaParticipantes[indiceAleatorio]);
        copiaParticipantes.splice(indiceAleatorio, 1);
    }
    localStorage.setItem("ganadores", JSON.stringify(ganadores));

    ganadores.forEach((ganador, indice) => {
        const itemGanador = document.createElement("li");
        const etiquetaNombre = document.createElement("p");
        const etiquetaNumero = document.createElement("span");
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
    setTimeout(() => alertaError.classList.remove("active"), 3000);
}

// --- GUARDAR DATOS EN CUADRO ELIMINATORIA ---
window.onload = function GuardarDatos() {
    let ganadores = JSON.parse(localStorage.getItem('ganadores'));
    if (ganadores && ganadores.length > 0) {
        let divs = [
            '.casilla-uno', '.casilla-dos', '.casilla-tres', '.casilla-cuatro',
            '.casilla-cinco', '.casilla-seis', '.casilla-siete', '.casilla-ocho',
            '.casilla-nueve', '.casilla-diez', '.casilla-once', '.casilla-doce',
            '.casilla-trece', '.casilla-catorce', '.casilla-quince', '.casilla-diesiseis'
        ].map(selector => document.querySelector(selector));

        ganadores.forEach((ganador, index) => {
            if (divs[index]) {
                let p = document.createElement('p');
                p.textContent = ganador;
                divs[index].appendChild(p);
            }
        });
    }
};