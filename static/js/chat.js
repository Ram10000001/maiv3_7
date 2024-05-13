import { showLoadingAnimation, hideLoadingAnimation } from "./loadanim.js";
import { convertirExamen } from "./htmlconverter.js"
import { crearExamenJson } from './claseexamen.js';
import { ventanaFlotante } from "./ventanaf.js";

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function getTime() {
    let today = new Date();
    let hours = today.getHours();  // Declare 'hours' with 'let'
    let minutes = today.getMinutes();  // Declare 'minutes' with 'let'

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}

export function firstBotMessage(nombre) {
    let firstMessage = "Hola, " + nombre + ". ¿En qué puedo ayudarte?";
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';
    let time = getTime();
    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

function sendAjaxRequest(csrftoken) {
    hideLoadingAnimation();
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/cerebro/recibir/',  // La URL de tu vista uwu
            type: 'GET',
            headers: { 'X-CSRFToken': csrftoken },
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

function processRequest(userText, csrftoken) {
    $.ajax({
        url: '/cerebro/enviar/',
        type: 'POST',
        data: { 'userText': userText },
        headers: { 'X-CSRFToken': csrftoken }
    }).then(data => {
        sendAjaxRequest(csrftoken) //Envia la respuesta a la IA para que la procese
            .then(data => {
                showModelResponse(data.respuesta); //Muestra la respuesta de la IA en el chat
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.onload = ventanaFlotante;

//formatea el contenido del chat para moverlo a una nueva pagina HTML
function formatBubbleChat(div) {
    let editLink = document.createElement('a'); // Crear un nuevo elemento a
    editLink.href = '/editor/editor?text=' + encodeURIComponent(div.innerHTML); // Aquí puedes poner la URL a la que quieres que lleve el enlace "Editar"
    editLink.textContent = 'Editar';
    editLink.className = 'edit-link';
    div.appendChild(editLink); // Añadir el enlace "Editar" al div
}

//convierte las preguntas a objetos
function convertirObjeto(botResponse) {
    let data = JSON.parse(botResponse);
    let respuesta = crearExamenJson(data.examen);
    console.log(respuesta);
    return respuesta;
}

//Muestra la respuesta de la IA en el chat 
function showModelResponse(botResponse) {
    //let responseText = processusExam(botResponse);
    let test = convertirObjeto(botResponse);
    let responseText = convertirExamen(test);
    let chatbox = document.getElementById('chatbox');
    let div = document.createElement('div'); // Crear un nuevo elemento div para la burbuja de chat
    let p = document.createElement('p'); // Crear un nuevo elemento p para el texto del chat
    let span = document.createElement('span'); // Crear un nuevo elemento span
    div.className = 'botText'; // Asegúrate de que el div tiene la clase correcta para la burbuja del chat
    span.innerHTML = responseText; // Añadir el contenido HTML al span
    p.appendChild(span); // Añadir el span al p
    div.appendChild(p); // Añadir el p al div

    formatBubbleChat(div); //formatea el contenido del chat para moverlo a una nueva pagina HTML
    chatbox.appendChild(div); // Añadir el div al chatbox
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function showUserText(userText) {
    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

// Envio del texto del usuario & obetención de la respuesta 
function getResponse() {
    let userText = $("#textInput").val();
    const csrftoken = getCookie('csrftoken');
    showUserText(userText); //Muestra el texto del usuario en el chat
    showLoadingAnimation();
    processRequest(userText, csrftoken); //Procesa la peticion del usuario y extrae la respuesta de Gemini
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     showModelResponse(sampleText);
    // }, 1000)
}

function sendButton() {
    var texto = document.getElementById("textInput").value;
    if (texto) {
        getResponse();
    }
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});

// Evita el salto de línea
document.getElementById("textInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendButton(); // Llama a la función para enviar el mensaje
    }
});



