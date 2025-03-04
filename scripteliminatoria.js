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
                let p = document.createElement('h1');
                p.textContent = ganador;  // Asignamos el nombre del ganador al elemento <p>
                divs[index].appendChild(p);  // Agregamos el <p> dentro del div correspondiente
            }
        });
    } else {
        console.log("No hay ganadores para mostrar.");
    }




    
}