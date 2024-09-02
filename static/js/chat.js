//import { showLoadingAnimation, hideLoadingAnimation } from "./loadanim.js";
import { convertirExamen, processusExam } from "./htmlconverter.js";
import { crearExamenJson } from "./claseexamen.js";
//import { ventanaFlotante } from "./ventanaf.js";

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function getTime() {
  let today = new Date();
  let hours = today.getHours(); // Declare 'hours' with 'let'
  let minutes = today.getMinutes(); // Declare 'minutes' with 'let'

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
  document.getElementById("botStarterMessage").innerHTML =
    '<p class="botText"><span>' + firstMessage + "</span></p>";
  let time = getTime();
  $("#chat-timestamp").append(time);
  document.getElementById("userInput").scrollIntoView(false);
}

function sendAjaxRequest(csrftoken) {
  //hideLoadingAnimation();
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/cerebro/recibir/", // La URL de tu vista uwu
      type: "GET",
      headers: { "X-CSRFToken": csrftoken },
      success: function (data) {
        resolve(data);
      },
      error: function (error) {
        reject(error);
      },
    });
  });
}

function processRequest(userText, csrftoken) {
  $.ajax({
    url: "/cerebro/enviar/",
    type: "POST",
    data: { userText: userText },
    headers: { "X-CSRFToken": csrftoken },
  })
    .then((data) => {
      sendAjaxRequest(csrftoken) //Envia la respuesta a la IA para que la procese
        .then((data) => {
          //showModelResponse(data.respuesta); //Muestra la respuesta de la IA en el chat
          console.log("AJAX FLAG");
          modelResponse(data.respuesta);
        })
        .catch((error) => {
          console.error("Error:", error);
          //hideLoadingAnimation();
        });
    })
    .catch((error) => {
      console.error("Error:", error);
      //hideLoadingAnimation();
    });
}

//window.onload = ventanaFlotante;
window.sendButton = sendButton;

//formatea el contenido del chat para moverlo a una nueva pagina HTML
function formatBubbleChat(div) {
  // Crear un nuevo elemento a para el enlace "Editar"
  let editLink = document.createElement("a");
  editLink.href = "/editor/editor?text=" + encodeURIComponent(div.innerHTML);
  editLink.textContent = "Editar";
  editLink.className = "edit-link";
  div.appendChild(editLink); // Añadir el enlace "Editar" al div

  // Crear un nuevo elemento button para el botón "Generar PDF"
  let pdfButton = document.createElement("button");
  pdfButton.onclick = function () {
    generatePDF(div);
  }; // Aquí puedes poner la función que genera el PDF
  pdfButton.textContent = "PDF";
  pdfButton.className = "pdf-button";
  div.appendChild(pdfButton); // Añadir el botón "Generar PDF" al div
}

function pasarEditor(div) {
  // Crear el enlace de redirección
  let url = "/editor/editor?text=" + encodeURIComponent(div.innerHTML);
  // Redirigir automáticamente a la nueva URL
  window.location.href = url;
}

//Muestra la respuesta de la IA en el chat
function modelResponse(botResponse) {
  //let responseText = processusExam(botResponse);
  let test = convertirObjeto(botResponse);
  let responseText = convertirExamen(test);
  console.log(responseText);
  let div = document.createElement("div"); // Crear un nuevo elemento div para la burbuja de chat
  let p = document.createElement("p"); // Crear un nuevo elemento p para el texto del chat
  let span = document.createElement("span"); // Crear un nuevo elemento span
  div.className = "botText"; // Asegúrate de que el div tiene la clase correcta para la burbuja del chat
  span.innerHTML = responseText; // Añadir el contenido HTML al span
  p.appendChild(span); // Añadir el span al p
  div.appendChild(p); // Añadir el p al div

  pasarEditor(div);
}

// Aquí es donde definimos la función eliminarEtiquetas
function eliminarEtiquetas(str) {
  if (str === null || str === "") return false;
  else str = str.toString();
  // Reemplaza las etiquetas </h1> y </p> con saltos de línea
  str = str.replace(/<\/h1>/g, "\n");
  str = str.replace(/<\/p>/g, "\n\n"); // Agrega un salto de línea adicional
  // Elimina las demás etiquetas HTML
  str = str.replace(/<[^>]*>/g, "");
  return str;
}

function generatePDF(div) {
  let pdf = new jsPDF({
    unit: "pt", // Unidades en puntos
    format: ["595.28", "841.89"], // Tamaño de página A4 en puntos
  });

  // Convertir los márgenes de cm a pt
  let margenSuperiorInferior = 2.5 * 28.3; // Aproximadamente 70.75 pt
  let margenIzquierdoDerecho = 3 * 28.3; // Aproximadamente 84.9 pt

  let textoSinEtiquetas = eliminarEtiquetas(div.innerHTML);
  let lineas = textoSinEtiquetas.split("\n");

  let y = margenSuperiorInferior;
  let contadorPregunta = 0;
  let contadorOpcion = 0;
  for (let linea of lineas) {
    if (linea.startsWith("Cultura General")) {
      pdf.setFontSize(20); // Tamaño de fuente para el título
      pdf.text(linea, pdf.internal.pageSize.getWidth() / 2, y, {
        align: "center",
      });
      y += 14; // Ajusta este valor para cambiar el espaciado entre líneas
    } else if (linea.startsWith("¿")) {
      contadorPregunta++;
      contadorOpcion = 0;
      pdf.setFontSize(12); // Tamaño de fuente para las preguntas
      pdf.text(contadorPregunta + ". " + linea, margenIzquierdoDerecho, y);
      y += 14; // Ajusta este valor para cambiar el espaciado entre líneas
    } else if (linea.startsWith("Respuesta:")) {
      pdf.setFontSize(12); // Tamaño de fuente para las respuestas
      pdf.text(
        linea,
        pdf.internal.pageSize.getWidth() - margenIzquierdoDerecho,
        y,
        { align: "right" }
      );
      y += 28; // Añade un espacio extra después de cada respuesta
    } else {
      contadorOpcion++;
      pdf.setFontSize(12); // Tamaño de fuente para las opciones
      pdf.text(
        String.fromCharCode(96 + contadorOpcion) + ") " + linea,
        margenIzquierdoDerecho,
        y
      );
      y += 14; // Ajusta este valor para cambiar el espaciado entre líneas
    }
  }

  pdf.save("chat.pdf");
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
  console.log(responseText);
  let chatbox = document.getElementById("chatbox");
  let div = document.createElement("div"); // Crear un nuevo elemento div para la burbuja de chat
  let p = document.createElement("p"); // Crear un nuevo elemento p para el texto del chat
  let span = document.createElement("span"); // Crear un nuevo elemento span
  div.className = "botText"; // Asegúrate de que el div tiene la clase correcta para la burbuja del chat
  span.innerHTML = responseText; // Añadir el contenido HTML al span
  p.appendChild(span); // Añadir el span al p
  div.appendChild(p); // Añadir el p al div

  formatBubbleChat(div); //formatea el contenido del chat para moverlo a una nueva pagina HTML
  chatbox.appendChild(div); // Añadir el div al chatbox
  document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function showUserText(userText) {
  let userHtml = '<p class="userText"><span>' + userText + "</span></p>";
  $("#textInput").val("");
  $("#chatbox").append(userHtml);
  document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

// Envio del texto del usuario & obetención de la respuesta
function getResponse() {
  let userText = $("#textInput").val();
  const csrftoken = getCookie("csrftoken");
  showUserText(userText); //Muestra el texto del usuario en el chat
  //showLoadingAnimation();
  processRequest(userText, csrftoken); //Procesa la peticion del usuario y extrae la respuesta de Gemini
}

function obtenerRespuesta() {
  let userText =
    "Genera un examen de " +
    $("input0 tema").val() +
    " para el grado de " +
    $("input1 materia").val() +
    " con la siguiente cantidad del tipo de preguntas: opcion_multiple:" +
    $("state opc_mul").val() +
    " verdadero_falso:" +
    $("state var_fal").val() +
    " respuesta_corta:" +
    $("state res_cor").val() +
    " emparejamiento:" +
    $("state emp").val() +
    " respuesta_numerica:" +
    $("state res_num").val() +
    " respuesta_larga:" +
    $("state res_lag").val() +
    " seleccion_multiple:" +
    $("state sel_mul").val() +
    " rellenar_espacios:" +
    $("state rel_esp").val();

  const csrftoken = getCookie("csrftoken");
  //showLoadingAnimation();
  processRequest(userText, csrftoken); //Procesa la peticion del usuario y extrae la respuesta de Gemini
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
  let userHtml = '<p class="userText"><span>' + sampleText + "</span></p>";
  $("#textInput").val("");
  $("#chatbox").append(userHtml);
  document.getElementById("chat-bar-bottom").scrollIntoView(true);

  //Uncomment this if you want the bot to respond to this buttonSendText event
  // setTimeout(() => {
  //     showModelResponse(sampleText);
  // }, 1000)
}

function botePronto() {
  let botResponse = {
    examen: {
      titulo: "Examen de Biología - La Célula",
      descripcion:
        "Este examen evalúa tu conocimiento sobre la célula, su estructura y funciones.",
      preguntas: [
        {
          tipo: "opcion_multiple",
          enunciado:
            "¿Cuál de las siguientes NO es una característica de todas las células?",
          instrucciones: "Selecciona una opción de las proporcionadas.",
          opciones: [
            "Membrana plasmática",
            "Pared celular",
            "Material genético",
            "Ribosomas",
          ],
          respuesta_correcta: "Pared celular",
          fuente:
            "https://es.khanacademy.org/science/biology/structure-of-a-cell",
        },
        {
          tipo: "verdadero_falso",
          enunciado: "La mitocondria es responsable de la fotosíntesis.",
          instrucciones: "Selecciona 'Verdadero' o 'Falso'.",
          respuesta_correcta: "Falso",
          fuente:
            "https://es.khanacademy.org/science/biology/structure-of-a-cell/tour-of-organelles/a/chloroplasts-and-mitochondria",
        },
        {
          tipo: "respuesta_corta",
          enunciado:
            "¿Cómo se llama el proceso por el cual la célula vegetal produce su propio alimento?",
          instrucciones: "Escribe tu respuesta en el espacio proporcionado.",
          respuesta_correcta: "Fotosíntesis",
          fuente:
            "https://es.khanacademy.org/science/biology/cellular-respiration-and-fermentation",
        },
        {
          tipo: "emparejamiento",
          enunciado: "Relaciona cada organelo con su función:",
          instrucciones: "Arrastra cada organelo a su función correspondiente.",
          pares: [
            { opcion: "Núcleo", enlace: "Almacena el ADN celular" },
            { opcion: "Ribosomas", enlace: "Sintetizan proteínas" },
            { opcion: "Mitocondria", enlace: "Produce energía (ATP)" },
          ],
          fuente:
            "https://es.khanacademy.org/science/biology/structure-of-a-cell",
        },
        {
          tipo: "respuesta_numerica",
          enunciado: "¿Cuántos cromosomas tiene una célula humana normal?",
          instrucciones: "Escribe el número.",
          respuesta_correcta: 46,
          fuente:
            "https://medlineplus.gov/spanish/genetics/understanding/basics/chromosome/",
        },
        {
          tipo: "respuesta_larga",
          enunciado:
            "Describe las diferencias entre una célula procariota y una eucariota.",
          instrucciones: "Escribe tu respuesta en el espacio proporcionado.",
          fuente:
            "https://es.khanacademy.org/science/biology/structure-of-a-cell/prokaryotic-and-eukaryotic-cells/a/prokaryotic-cells",
        },
        {
          tipo: "seleccion_multiple",
          enunciado:
            "Selecciona las dos opciones que son componentes de la pared celular vegetal.",
          instrucciones: "Puede haber más de una respuesta correcta.",
          opciones: ["Celulosa", "Quitina", "Peptidoglucano", "Lignina"],
          respuestas_correctas: ["Celulosa", "Lignina"],
          fuente:
            "https://es.khanacademy.org/science/biology/structure-of-a-cell/plant-cell-structures-and-functions/a/plant-cell-walls",
        },
        {
          tipo: "rellenar_espacios",
          enunciado:
            "La ___________ es el medio gelatinoso dentro de la célula donde se encuentran los organelos.",
          instrucciones: "Escribe la palabra que falta en el espacio.",
          respuesta_correcta: "Citoplasma",
          fuente:
            "https://es.khanacademy.org/science/biology/structure-of-a-cell",
        },
      ],
    },
  };

  // Convertir a JSON string
  let botResponseJSON = JSON.stringify(botResponse);
  console.log(botResponseJSON);
  modelResponse(botResponseJSON);
}

export function sendButton() {
  //var texto = document.getElementById("textInput").value;
  //if (texto) {
  //getResponse();
  console.log("Flag enviar");
  //obtenerRespuesta();
  botePronto();
  //}
}

// Press enter to send a message
/*$("#textInput").keypress(function (e) {
  if (e.which == 13) {
    getResponse();
  }
});

// Evita el salto de línea
document
  .getElementById("textInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendButton(); // Llama a la función para enviar el mensaje
    }
  });*/
