function crearElementosHTML(examen) {
    // Crear un contenedor principal para el examen
    let contenedorExamen = document.createElement('div');
    // Crear un nuevo div para el título y la descripción
    let divTituloDescripcion = document.createElement('div');

    let titulo = document.createElement('h1');
    titulo.textContent = examen.titulo;
    divTituloDescripcion.appendChild(titulo);

    let descripcion = document.createElement('p');
    descripcion.textContent = examen.descripcion;
    divTituloDescripcion.appendChild(descripcion);

    // Agregar el div del título y la descripción al contenedor del examen
    contenedorExamen.appendChild(divTituloDescripcion);
    for (let pregunta of examen.preguntas) {
        let questionElement = createQuestionElement(pregunta);
        contenedorExamen.appendChild(questionElement);
    }
    return contenedorExamen;
}

function htmlElementToString(element) {
    let div = document.createElement('div');
    div.appendChild(element);
    return div.innerHTML;
}

export function convertirExamen(botResponse) {
    let examen = botResponse;
    let examenHTML = crearElementosHTML(examen);
    return htmlElementToString(examenHTML); // Usar la nueva función para convertir el elemento HTML a una cadena HTML
}

function convertere_JSON(botResponse) {
    let data;
    try {
        data = JSON.parse(botResponse);
        return data;
    } catch (e) {
        return botResponse;
    }
}

export function processusExam(botResponse) {
    let data = convertere_JSON(botResponse);
    return convertirExamen(data);
}

// Crear un nuevo elemento div para 'stocks' fuera de la función
let divPreguntas = document.createElement('div');
divPreguntas.id = 'stocks';

function createQuestionElement(pregunta) {
    // Crear un nuevo elemento div para la pregunta
    let div = document.createElement('div');
    div.classList.add('pregunta'); // Añade la clase común a todas las preguntas
    div.classList.add(pregunta.tipo); // Añade la clase específica del tipo de pregunta

    let p = document.createElement('p');
    p.textContent = pregunta.enunciado;
    div.appendChild(p);

    switch (pregunta.tipo) {
        case 'opcion_multiple':
            opMul(pregunta, div);
            break;
        case 'seleccion_multiple':
            selMul(pregunta, div);
            break;
        case 'verdadero_falso':
            verFal(pregunta, div);
            break;
        case 'emparejamiento':
            pareo(pregunta, div);
            break;
        case 'respuesta_numerica':
            respNum(pregunta, div);
            break;
        case 'rellenar_espacios':
        case 'respuesta_corta':
        case 'respuesta_larga':
            respTexto(pregunta, div);
            break;
        default:
            defaltam(pregunta, div);
            break;
    }

    if (pregunta.respuesta_correcta !== undefined) {
        let respuesta = document.createElement('p');
        respuesta.textContent = "Respuesta: " + pregunta.respuesta_correcta;
        div.appendChild(respuesta);
    }

    // Añadir el div de la pregunta al div 'stocks'
    divPreguntas.appendChild(div);

    return divPreguntas;
}


function selMul(pregunta, div) {
    for (let opcion of pregunta.opciones) {
        let input = document.createElement('input');
        input.type = pregunta.tipo === 'opcion_multiple' ? 'radio' : 'checkbox';
        input.name = pregunta.enunciado;
        input.value = opcion;

        let label = document.createElement('label');
        label.textContent = opcion;
        div.appendChild(input);
        div.appendChild(label);
    }
}

function opMul(pregunta, div) {
    for (let opcion of pregunta.opciones) {
        let input = document.createElement('input');
        input.type = 'radio';
        input.name = pregunta.enunciado;
        input.value = opcion;

        let label = document.createElement('label');
        label.textContent = opcion;
        div.appendChild(input);
        div.appendChild(label);
    }
}

function respNum(pregunta, div) {
    let input = document.createElement('input');
    input.type = 'number';
    input.name = pregunta.enunciado;
    input.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    div.appendChild(input);
}

function createRadioButton(name, value, text) {
    let button = document.createElement('input');
    button.type = 'radio';
    button.name = name;
    button.value = value;

    let label = document.createElement('label');
    label.textContent = text;

    return { button, label };
}

function verFal(pregunta, div) {
    let verdadero = createRadioButton(pregunta.enunciado, 'Verdadero', 'Verdadero');
    div.appendChild(verdadero.button);
    div.appendChild(verdadero.label);

    let falso = createRadioButton(pregunta.enunciado, 'Falso', 'Falso');
    div.appendChild(falso.button);
    div.appendChild(falso.label);
}

function defaltam(pregunta, div) {
    let input = document.createElement('input');
    input.type = 'text';
    input.name = pregunta.enunciado;
    div.appendChild(input);
}

function respTexto(pregunta, div) {
    let input = document.createElement('input');
    input.type = 'text';
    input.name = pregunta.enunciado;

    // Limita la longitud de la entrada basándote en el tipo de pregunta
    switch (pregunta.tipo) {
        case 'rellenar_espacios':
            input.maxLength = 50; // Ajusta este valor según tus necesidades
            break;
        case 'respuesta_corta':
            input.maxLength = 200; // Ajusta este valor según tus necesidades
            break;
        case 'respuesta_larga':
            input.maxLength = 1000; // Ajusta este valor según tus necesidades
            break;
    }

    div.appendChild(input);
}

function pareo(pregunta, div) {
    let instrucciones = document.createElement('p');
    instrucciones.textContent = pregunta.instrucciones;
    div.appendChild(instrucciones);

    let contenedorArrastrables = document.createElement('div');
    contenedorArrastrables.className = 'contenedor';

    let contenedorObjetivos = document.createElement('div');
    contenedorObjetivos.className = 'contenedor';

    for (let par of pregunta.pares) {
        for (let clave in par) {
            let valor = par[clave];

            // Crear el elemento arrastrable
            let arrastrable = crearElementoArrastrable(valor);
            arrastrable.id = valor; // Asegúrate de que cada id sea único
            contenedorArrastrables.appendChild(arrastrable);

            // Crear el objetivo de soltar
            let objetivo = crearObjetivoSoltar(clave);
            contenedorObjetivos.appendChild(objetivo);
        }
    }

    div.appendChild(contenedorArrastrables);
    div.appendChild(contenedorObjetivos);
}

function crearElementoArrastrable(texto) {
    let arrastrable = document.createElement('div');
    arrastrable.textContent = texto;
    arrastrable.draggable = true;
    arrastrable.className = 'arrastrable';
    arrastrable.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text', event.target.id);
    });
    return arrastrable;
}

function crearObjetivoSoltar(texto) {
    let objetivo = document.createElement('div');
    objetivo.textContent = texto;
    objetivo.className = 'objetivo';
    objetivo.addEventListener('dragover', function (event) {
        event.preventDefault();
    });
    objetivo.addEventListener('drop', function (event) {
        event.preventDefault();
        let data = event.dataTransfer.getData('text');
        event.target.appendChild(document.getElementById(data));
    });
    return objetivo;
}