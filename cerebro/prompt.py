import json

mensaje = {
    "examen": {
        "titulo": "{titulo}",
        "descripcion": "{descripcion_del_examen}",
        "preguntas": [
            {
                "tipo": "opcion_multiple",
                "enunciado": "{enunciado_pregunta}",
                "instrucciones": "Selecciona una opción de las proporcionadas.",
                "opciones": [
                    "{opcion 1}",
                    "{opcion 2}",
                    "{opcion 3}",
                    "{opcion 4}"
                ],
                "respuesta_correcta": "{respuesta_correcta}",
                "fuente": "{url_de_la_fuente_de_informacion}"
            },
            {
                "tipo": "verdadero_falso",
                "enunciado": "{enunciado_pregunta}",
                "instrucciones": "Selecciona 'Verdadero' o 'Falso'.",
                "respuesta_correcta": "{respuesta_correcta}",
                "fuente": "{url_de_la_fuente_de_informacion}"
            },
            {
                "tipo": "respuesta_corta",
                "enunciado": "{enunciado_pregunta}",
                "instrucciones": "Escribe tu respuesta en el espacio proporcionado.",
                "respuesta_correcta": "{respuesta_correcta}",
                "fuente": "{url_de_la_fuente_de_informacion}"
            },
            {
                "tipo": "emparejamiento",
                "enunciado": "{enunciado_pregunta}",
                "instrucciones": "Arrastra cada país a su capital correspondiente.",
                "pares": [
                    {"{opcion_a}": "{opcion_a_texto}",
                     "{enlace_a}": "{enlace_a_texto}"},
                    {"{opcion_b}": "{opcion_b_texto}",
                     "{enlace_b}": "{enlace_b_texto}"},
                    {"{opcion_c}": "{opcion_c_texto}",
                     "{enlace_c}": "{enlace_c_texto}"}
                ],
                "fuente": "{url_de_la_fuente_de_informacion}"
            },
            {
                "tipo": "respuesta_numerica",
                "enunciado": "{enunciado_pregunta}",
                "instrucciones": "{instrucciones}",
                "respuesta_correcta": 10,
                "fuente": "{url_de_la_fuente_de_informacion}"
            },
            {
                "tipo": "respuesta_larga",
                "enunciado": "{enunciado_pregunta}",
                "instrucciones": "{instrucciones}",
                "fuente": "{url_de_la_fuente_de_informacion}"
            },
            {
                "tipo": "seleccion_multiple",
                "enunciado": "{enunciado_pregunta}",
                "instrucciones": "{instrucciones}",
                "opciones": [
                    "{opcion_1}",
                    "{opcion_2}",
                    "{opcion_3}",
                    "{opcion_4}"
                ],
                "respuestas_correctas": ["{opcion_correcta_1}", "{opcion_correcta_2}"],
                "fuente": "{url_de_la_fuente_de_informacion}"
            },
            {
                "tipo": "rellenar_espacios",
                "enunciado": "{enunciado_pregunta}",
                "instrucciones": "{instrucciones}",
                "respuesta_correcta": "{respuesta_correcta}",
                "fuente": "{url_de_la_fuente_de_informacion}"
            }
        ]
    }
}

mensajeTextJson = json.dumps(mensaje)
prompt_parts = mensajeTextJson
# 'Genera un examen con el siguiente formato: ' + json.dumps(mensaje)
# 'Genera un examen JSON. Formato: {  "examen": { "titulo": "{titulo}", "descripcion": "{descripcion_del_examen}", "preguntas": [ { "tipo": "opcion_multiple", "enunciado": "{enunciado_pregunta}", "instrucciones": "Selecciona una opción de las proporcionadas.", "opciones": [ "{opcion 1}", "{opcion 2}", "{opcion 3}", "{opcion 4}"], "respuesta_correcta": "{respuesta_correcta}" }, { "tipo": "verdadero_falso", "enunciado": "{enunciado_pregunta}", "instrucciones": "Selecciona \'Verdadero\' o \'Falso\'.", "respuesta_correcta": "{respuesta_correcta}" }, { "tipo": "respuesta_corta", "enunciado": "{enunciado_pregunta}", "instrucciones": "Escribe tu respuesta en el espacio proporcionado.", "respuesta_correcta": "{respuesta_correcta}" },{"tipo": "emparejamiento","enunciado": "{enunciado_pregunta}","instrucciones": "Arrastra cada país a su capital correspondiente.","pares": [{"{opcion_a}": "{opcion_a_texto}", "{enlace_a}": "{enlace_a_texto}"},{"{opcion_b}": "{opcion_b_texto}", "{enlace_b}": "{enlace_b_texto}"},{"{opcion_c}": "{opcion_c_texto}", "{enlace_c}": "{enlace_c_texto}"},]},{"tipo": "respuesta_numerica","enunciado": "{enunciado_pregunta}","instrucciones": "{instrucciones}","respuesta_correcta": 10},{"tipo": "ensayo","enunciado": "{enunciado_pregunta}","instrucciones": "{instrucciones}"},{"tipo": "respuesta_larga","enunciado": "{enunciado_pregunta}","instrucciones": "{instrucciones}"},{"tipo": "seleccion_multiple","enunciado": "{enunciado_pregunta}","instrucciones": "{instrucciones}","opciones": ["{opcion_1}","{opcion_2}","{opcion_3}","{opcion_4}"],"respuestas_correctas": ["{opcion_correcta_1}", "{opcion_correcta_2}"]},{"tipo": "rellenar_espacios","enunciado": "{enunciado_pregunta}","instrucciones": "{instrucciones}","respuesta_correcta": "{respuesta_correcta}"}]}}. No incluyas que el formato es tipo json. No incluyas comillas triples (''\').'
# 'Actua como maestro de primaria. Genera un examen en formato XML que contenga solo un elemento <examen>. No incluyas texto plano. No indiques que es un xml. No incluyas comillas. No incluyas ninguna cosa a parte de codigo XML. Aqui un ejemplo de como quiero que me estregues tu respuesta: <examen> <pregunta>¿Cuál es la capital de España?</pregunta><respuestas> <respuesta>Madrid</respuesta> <respuesta>Barcelona</respuesta> <respuesta>Valencia</respuesta> <respuesta>Sevilla</respuesta> </respuestas> <respuesta_correcta>Madrid</respuesta_correcta></examen>'
