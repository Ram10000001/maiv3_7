function botonesPreguntas() {
    // Obtén todos los elementos con la clase 'pregunta'
    var preguntas = document.getElementsByClassName('pregunta');

    // Itera sobre cada elemento
    for (var i = 0; i < preguntas.length; i++) {
        // Crea los botones
        var botonEditar = document.createElement('a');
        var botonEliminar = document.createElement('a');

        // Añade las clases y el texto a los botones
        botonEditar.className = 'btn btn-primary';
        botonEditar.textContent = 'Editar';
        botonEliminar.className = 'btn btn-danger';
        botonEliminar.textContent = 'Eliminar';

        // Añade los botones al final de cada pregunta
        preguntas[i].appendChild(botonEditar);
        preguntas[i].appendChild(botonEliminar);
    }
}

window.onload = botonesPreguntas;
