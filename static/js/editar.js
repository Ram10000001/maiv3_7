/*
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
        botonEditar.className = 'btn btn-primary botonEditar';
        botonEditar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/> <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/> </svg>';

        botonEditar.setAttribute('title', 'Editar');
        

        // Añade funcionalidad al botón
        botonEditar.onclick = makeOnClickHandler(preguntas[i]);

        preguntas[i].appendChild(botonEditar);
    }
}
    

function botonBorrar() {
    var preguntas = document.getElementsByClassName('pregunta');

    for (var i = 0; i < preguntas.length; i++) {
        var botonEliminar = document.createElement('a');
        botonEliminar.className = 'btn btn-danger botonEliminar';
        botonEliminar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>';
        botonEliminar.setAttribute('title', 'Eliminar');

        // Añade funcionalidad al botón
        botonEliminar.onclick = function(event) {
            var pregunta = event.target.closest('.pregunta');
            pregunta.parentNode.removeChild(pregunta);
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
function ventanaScrollBotones() {
    window.addEventListener('scroll', function() {
      var scrollPosition = window.scrollY; // Obtiene la posición de desplazamiento vertical
      var botonesAyudantes = document.querySelector('.botones-ayudantes');
      
      if (scrollPosition > 100) { // Ajusta esta condición según sea necesario
        botonesAyudantes.style.top = (scrollPosition + 20) + 'px'; // Ajusta la distancia desde la parte superior
      } else {
        botonesAyudantes.style.top = '16rem'; // Restablece la posición inicial cuando el desplazamiento es menor a 100
      }
    });
  }
  

  window.onload = function() {
    //ventanaScrollBotones();
    //botonEditar();
   // botonBorrar();
   // moverPreguntas();
  };
  */