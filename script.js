const apiKey = "64c18eb04cb146ae86355bbe1f64d883"; 

let juegosGuardados = JSON.parse(localStorage.getItem("favoritos")) || []; // Cargar favoritos

function buscarJuego() {
    let nombre = document.getElementById("gameName").value;
    let url = `https://api.rawg.io/api/games?key=${apiKey}&search=${nombre}&page_size=30`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let juegos = data.results;
            let html = ""; 

            juegos.forEach(juego => {
                let agregado = juegosGuardados.some(j => j.id === juego.id);
                
                html += `
                    <div class="tarjeta">
                        <img src="${juego.background_image}" alt="${juego.name}">
                        <h2>${juego.name}</h2>
                        <p>Fecha de lanzamiento: ${juego.released || "No disponible"}</p>
                        <p>Calificación: ${juego.rating} ⭐</p>
                        <button onclick="guardarJuego(${juego.id}, '${juego.name}', '${juego.background_image}')">
                            ${agregado ? "✅ Guardado" : "➕ Agregar"}
                        </button>
                    </div>
                `;
            });

            document.getElementById("gameInfo").innerHTML = html;
        })
        .catch(error => {
            document.getElementById("gameInfo").innerHTML = "<p>Error al buscar juegos</p>";
        });
}
function mostrarJuegosGuardados() {
    let contenedor = document.getElementById("favoritos");
    contenedor.innerHTML = "<h2>Juegos Guardados</h2>";

    if (juegosGuardados.length === 0) {
        contenedor.innerHTML += "<p>No hay juegos guardados</p>";
        return;
    }

    juegosGuardados.forEach((juego, index) => {
        contenedor.innerHTML += `
            <div class="tarjeta">
                <img src="${juego.imagen}" alt="${juego.nombre}">
                <h2>${juego.nombre}</h2>
                <button onclick="eliminarJuego(${index})">❌ Eliminar</button>
            </div>
        `;
    });
}

function agregarJuegoManual() {
    let nombre = document.getElementById("nombreJuego").value;
    let imagen = document.getElementById("imagenJuego").value;

    if (!nombre || !imagen) {
        alert("Por favor ingresa un nombre y una imagen válida");
        return;
    }

    let nuevoJuego = { id: Date.now(), nombre, imagen };
    juegosGuardados.push(nuevoJuego);
    localStorage.setItem("favoritos", JSON.stringify(juegosGuardados));

    mostrarJuegosGuardados(); // Actualizar la lista
}

function eliminarJuego(index) {
    juegosGuardados.splice(index, 1);
    localStorage.setItem("favoritos", JSON.stringify(juegosGuardados));

    mostrarJuegosGuardados(); // Recargar la lista
}

// Mostrar juegos guardados al cargar la página
mostrarJuegosGuardados();

function guardarJuego(id, nombre, imagen) {
    let index = juegosGuardados.findIndex(j => j.id === id);
    
    if (index === -1) {
        juegosGuardados.push({ id, nombre, imagen });
    } else {
        juegosGuardados.splice(index, 1); // Eliminar si ya está agregado
    }

    localStorage.setItem("favoritos", JSON.stringify(juegosGuardados)); // Guardar en LocalStorage
    buscarJuego(); // Recargar la lista
}