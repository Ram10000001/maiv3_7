function botonEditar() {
    var preguntas = document.getElementsByClassName('pregunta');

    // Función de fábrica para generar controladores de eventos
    function makeOnClickHandler(i) {
        return function() {
            // Crea una ventana modal
            var modal = document.createElement('div');
            modal.style.width = '500px';
            modal.style.height = '700px';
            modal.style.backgroundColor = 'white';
            modal.style.position = 'fixed';
            modal.style.top = '50%';
            modal.style.left = '50%';
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.overflow = 'auto';
            modal.style.padding = '20px';
            modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
            modal.style.zIndex = '1000';

            // Crea un botón para cerrar la ventana modal
            var closeButton = document.createElement('button');
            closeButton.textContent = 'Cerrar';
            closeButton.onclick = function() {
                document.body.removeChild(modal);
            };

            // Añade el contenido de la pregunta y el botón de cierre a la ventana modal
            modal.innerHTML = preguntas[i].innerHTML;
            modal.appendChild(closeButton);

            // Añade la ventana modal al cuerpo del documento
            document.body.appendChild(modal);
        };
    }

    for (var i = 0; i < preguntas.length; i++) {
        var botonEditar = document.createElement('a');
        botonEditar.className = 'btn btn-primary';
        botonEditar.textContent = 'Editar';

        // Añade funcionalidad al botón
        botonEditar.onclick = makeOnClickHandler(i);

        preguntas[i].appendChild(botonEditar);
    }
}

function botonBorrar() {
    var preguntas = document.getElementsByClassName('pregunta');

    for (var i = 0; i < preguntas.length; i++) {
        var botonEliminar = document.createElement('a');
        botonEliminar.className = 'btn btn-danger';
        botonEliminar.textContent = 'Eliminar';

        // Añade funcionalidad al botón
        botonEliminar.onclick = function() {
            // Código para eliminar la pregunta
        };

        preguntas[i].appendChild(botonEliminar);
    }
}

function moverPreguntas(){
    const dragAndDropItems = document.getElementById("stocks");

    new Sortable(dragAndDropItems, {
        animation: 350,
        chosenClass: "stock-chosen",
        dragClass: "stock-drag",
    });
}

function divPreguntas() {
    // Obtiene el elemento que contiene las preguntas
    var contenedorPreguntas = document.querySelector('.pregunta-estilo .titulo-instruccion div div');

    // Crea un nuevo elemento div
    var nuevoDiv = document.createElement('div');

    // Asigna el id 'examenesuwu' al nuevo div
    nuevoDiv.id = 'stocks';

    // Mueve todas las preguntas al nuevo div
    while (contenedorPreguntas.firstChild) {
        nuevoDiv.appendChild(contenedorPreguntas.firstChild);
    }

    // Agrega el nuevo div al contenedor de preguntas
    contenedorPreguntas.appendChild(nuevoDiv);
}

window.onload = function() {
    botonEditar();
    botonBorrar();
    moverPreguntas();
    divPreguntas();
};

