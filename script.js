const apiKey = "64c18eb04cb146ae86355bbe1f64d883"; 

function buscarJuego() {
    let nombre = document.getElementById("gameName").value;
    let url = `https://api.rawg.io/api/games?key=${apiKey}&search=${nombre}&page_size=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                let juego = data.results[0];
                document.getElementById("gameInfo").innerHTML = `
                    <h2>${juego.name}</h2>
                    <img src="${juego.background_image}" width="300">
                    <p>Fecha de lanzamiento: ${juego.released}</p>
                    <p>Calificación: ${juego.rating} / 5</p>
                `;
            } else {
                document.getElementById("gameInfo").innerHTML = "<p>Juego no encontrado</p>";
            }
        })
        .catch(error => {
            document.getElementById("gameInfo").innerHTML = "<p>Error al buscar el juego</p>";
        });
}