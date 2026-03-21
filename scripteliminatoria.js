let jugadorSeleccionado = null;
let casillaPrevia = null;

window.onload = function() {
    let ganadores = JSON.parse(localStorage.getItem('ganadores'));

    if (ganadores) {
        // Llenamos los 16 de Octavos por ID
        for (let i = 1; i <= 16; i++) {
            const casilla = document.getElementById(`o${i}`);
            if (casilla) {
                let h1 = casilla.querySelector('h1');
                if (!h1) {
                    h1 = document.createElement('h1');
                    casilla.appendChild(h1);
                }
                h1.textContent = ganadores[i - 1] || "";
            }
        }
    }
    configurarEventosTorneo();
};
function configurarEventosTorneo() {
    const todasLasCasillas = document.querySelectorAll('[class^="casilla-"]');

    todasLasCasillas.forEach(casilla => {
        casilla.addEventListener('click', function() {
            const h1 = this.querySelector('h1');
            const texto = h1 ? h1.textContent.trim() : "";

            if (jugadorSeleccionado && texto === "") {
                // Pegar en casilla vacía
                h1.textContent = jugadorSeleccionado;
                if (casillaPrevia) casillaPrevia.classList.remove('seleccionado');
                jugadorSeleccionado = null;
                casillaPrevia = null;
            } else if (texto !== "" && texto !== "CAMPEÓN") {
                // Seleccionar para mover
                if (casillaPrevia) casillaPrevia.classList.remove('seleccionado');
                this.classList.add('seleccionado');
                jugadorSeleccionado = texto;
                casillaPrevia = this;
            }
        });

        // Doble clic para borrar error
        casilla.addEventListener('dblclick', function() {
            const h1 = this.querySelector('h1');
            if (h1) h1.textContent = "";
            this.classList.remove('seleccionado');
        });
    });
}

function seleccionarJugador(elemento) {
    const h1 = elemento.querySelector('h1');
    if (!h1) return;

    // Quitar marca de la casilla anterior
    if (casillaPrevia) casillaPrevia.classList.remove('seleccionado');
    
    // Marcar la nueva
    elemento.classList.add('seleccionado');
    jugadorSeleccionado = h1.textContent;
    casillaPrevia = elemento;
}

function pegarJugador(elemento) {
    let h1 = elemento.querySelector('h1');
    if (!h1) {
        h1 = document.createElement('h1');
        elemento.appendChild(h1);
    }

    h1.textContent = jugadorSeleccionado;
    
    // Limpiar selección para el siguiente movimiento
    if (casillaPrevia) casillaPrevia.classList.remove('seleccionado');
    jugadorSeleccionado = null;
    casillaPrevia = null;
}

