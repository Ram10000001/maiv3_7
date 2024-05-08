import React from 'react';

function SelMul({ pregunta }) {
    return (
        <div>
            {pregunta.opciones.map((opcion, index) => (
                <div key={index}>
                    <input
                        type={pregunta.tipo === 'opcion_multiple' ? 'radio' : 'checkbox'}
                        name={pregunta.enunciado}
                        value={opcion}
                    />
                    <label>{opcion}</label>
                </div>
            ))}
        </div>
    );
}

function RadioButton({ name, value, text }) {
    return (
        <div>
            <input type="radio" name={name} value={value} />
            <label>{text}</label>
        </div>
    );
}

function VerFal({ pregunta }) {
    return (
        <div>
            <RadioButton name={pregunta.enunciado} value="Verdadero" text="Verdadero" />
            <RadioButton name={pregunta.enunciado} value="Falso" text="Falso" />
        </div>
    );
}

function Defaltam({ pregunta }) {
    return <input type="text" name={pregunta.enunciado} />;
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

function Pareo({ pregunta }) {
    return (
        <div>
            <p>{pregunta.instrucciones}</p>
            <div className='contenedor'>
                {pregunta.pares.map((par, index) => (
                    <Draggable key={index} value={par} />
                ))}
            </div>
            <div className='contenedor'>
                {pregunta.pares.map((par, index) => (
                    <DropTarget key={index} value={par} />
                ))}
            </div>
        </div>
    );
}



function CrearPreguntaElement({ pregunta }) {
    switch (pregunta.tipo) {
        case 'opcion_multiple':
        case 'seleccion_multiple':
            return <SelMul pregunta={pregunta} />;
        case 'verdadero_falso':
            return <VerFal pregunta={pregunta} />;
        case 'respuesta_corta':
            return <Defaltam pregunta={pregunta} />;
        case 'emparejamiento':
            return <Pareo pregunta={pregunta} />;
        // Y así sucesivamente para los otros tipos de preguntas...
        default:
            return <Defaltam pregunta={pregunta} />;
    }
}


function CrearElementosHTML({ examen }) {
    return (
        <div>
            <div>
                <h1>{examen.titulo}</h1>
                <p>{examen.descripcion}</p>
            </div>
            {examen.preguntas.map((pregunta, index) => (
                <CrearPreguntaElement pregunta={pregunta} key={index} />
            ))}
        </div>
    );
}

// No necesitas una función para convertir un elemento HTML a una cadena en React.
// React maneja la renderización del DOM por ti.

function ConvertirExamen({ botResponse }) {
    let examen = botResponse.examen;
    return <CrearElementosHTML examen={examen} />;
}

// Puedes usar JSON.parse directamente en tu componente principal para convertir la respuesta del bot a JSON.
// Si la respuesta del bot no es un JSON válido, esto lanzará un error que puedes manejar con un bloque try/catch.

export function ProcesarExamen({ botResponse }) {
    let data;
    try {
        data = JSON.parse(botResponse);
    } catch (e) {
        console.error('Error al parsear la respuesta del bot:', e);
        return <div>Error al cargar el examen.</div>;
    }
    return <ConvertirExamen botResponse={data} />;
}
