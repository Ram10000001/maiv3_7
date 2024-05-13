import { getCookie, firstBotMessage } from "./chat.js"

function enviarPrompt(materia, nombre) {
    fetch('/cerebro/enviarPrompt/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ materia: materia, nombre: nombre }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function manejarClickGuardar(event, modal, form) {
    event.preventDefault();
    var data = new FormData(form);
    var materia = data.get('materia') || '';
    var nombre = data.get('nombre') || 'profesor';
    var materiaText = document.getElementById('materia-text');

    if (materia === '') {
        materiaText.textContent = ' cualquier materia';
    } else {
        materiaText.textContent = materia;
    }

    modal.style.display = "none";
    firstBotMessage(nombre);    //El primer mensaje que envia el bot
    enviarPrompt(materia, nombre);   //Aqui se envian las variables a la vista a views.py
}

export function ventanaFlotante() {
    var modal = document.getElementById("myModal");
    var form = document.querySelector('form');
    var span = document.getElementsByClassName("close")[0];
    var guardar = document.getElementById('guardar');
    var fields = document.getElementsByClassName('form__field');

    modal.style.display = "block";
    guardar.addEventListener('click', function (event) {
        manejarClickGuardar(event, modal, form);
    });

    for (var i = 0; i < fields.length; i++) {
        fields[i].addEventListener('input', function () {
            if (this.value) {
                this.classList.add('form__field--has-value');
            } else {
                this.classList.remove('form__field--has-value');
            }
        });
    }
}
