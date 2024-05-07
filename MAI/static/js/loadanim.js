export function showLoadingAnimation() {
    let chatbox = document.getElementById('chatbox');
    let loadingDiv = document.createElement('div'); // Crear un nuevo elemento div para la animación de "cargando"
    loadingDiv.id = 'loading';
    loadingDiv.style.display = 'block';

    for (let i = 0; i < 3; i++) {
        let dot = document.createElement('span'); // Crear un nuevo elemento span para cada punto
        dot.className = 'dot';
        loadingDiv.appendChild(dot); // Añadir el punto al div de "cargando"
    }

    chatbox.appendChild(loadingDiv); // Añadir el div de "cargando" al chatbox
}

export function hideLoadingAnimation() {
    let loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.style.display = 'none'; // Ocultar la animación de "cargando"
    }
}
