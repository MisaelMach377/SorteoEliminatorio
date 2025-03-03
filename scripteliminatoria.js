window.onload = function() {
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
                let p = document.createElement('p');
                p.textContent = ganador;  // Asignamos el nombre del ganador al elemento <p>
                divs[index].appendChild(p);  // Agregamos el <p> dentro del div correspondiente
            }
        });
    } else {
        console.log("No hay ganadores para mostrar.");
    }
}