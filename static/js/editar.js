function makeOnClickHandler(pregunta) {
    return function() {
        console.log('makeOnClickHandler llamado con pregunta:', pregunta);

        // Oculta los botones de acción
        var botonesAccion = document.getElementsByClassName('botonAccion');
        for (var i = 0; i < botonesAccion.length; i++) {
            botonesAccion[i].style.display = 'none';
        }

        // Crea una ventana modal
        var modal = document.createElement('div');
        modal.className = 'modal';

        // Crea el contenido de la ventana modal
        var modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        // Crea un botón para cerrar la ventana modal
        var closeButton = document.createElement('button');
        closeButton.className = 'closeButton';
        closeButton.textContent = 'x';
        closeButton.onclick = function() {
            // Muestra los botones de acción cuando se cierra la ventana modal
            for (var i = 0; i < botonesAccion.length; i++) {
                botonesAccion[i].style.display = '';
            }

            document.body.removeChild(modal);
        };

        // Crea un botón para guardar
        var saveButton = document.createElement('button');
        saveButton.className = 'saveButton';
        saveButton.textContent = 'Guardar';
        saveButton.onclick = function() {
            // Código para guardar la pregunta
        };

        // Añade solo el texto de la pregunta a la ventana modal
        var preguntaTexto = document.createElement('p');
        preguntaTexto.textContent = pregunta.textContent;
        preguntaTexto.className = 'texto-ventana';  // Agrega la clase 'texto-ventana'
        modalContent.appendChild(preguntaTexto);

        // Añade los botones a la ventana modal
        modalContent.appendChild(closeButton);
        modalContent.appendChild(saveButton);

        // Añade el contenido de la ventana modal a la ventana modal
        modal.appendChild(modalContent);

        // Añade la ventana modal al cuerpo del documento
        document.body.appendChild(modal);
    };
}




function botonEditar() {
    var preguntas = document.getElementsByClassName('pregunta');
    console.log('botonEditar llamado con preguntas:', preguntas);  // Agrega esta línea

    for (var i = 0; i < preguntas.length; i++) {
        var botonEditar = document.createElement('a');
        botonEditar.className = 'btn btn-primary';
        botonEditar.textContent = 'Editar';

        // Añade funcionalidad al botón
        botonEditar.onclick = makeOnClickHandler(preguntas[i]);

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



window.onload = function() {
    botonEditar();
    botonBorrar();
    moverPreguntas();
    makeOnClickHandler();
};

