from .models import Pregunta
import google.generativeai as genai
from .prompt import prompt_parts
import json
import logging
import random
from .jsontools import eliminar_cadenas
from google.api_core.exceptions import InternalServerError
#from dotenv import load_dotenv  # Importa la función load_dotenv
import environ
#load_dotenv()  # Carga las variables de entorno desde el archivo .env

env = environ.Env()
environ.Env.read_env()

logging.basicConfig(level=logging.ERROR)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# Usa os.getenv para obtener la clave de API
genai.configure(api_key='AIzaSyAdMe_BBkhCoOj0l6nhgulEiGEXYXS_Ni4')

uploaded_files = []

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]


"""def historial():  # Extrae el historial de la base de datos
    objects = Pregunta.objects.all()
    historial = []
    # Itera sobre cada objeto
    for obj in objects:
        # Crea un diccionario con la estructura deseada
        datos = {
            "role": obj.role,
            "parts": obj.parts.split(",")
        }
        historial.append(datos)
    return historial


def show_chat_history(chat):
    logger.info('\n\n---CHAT HISTORY:')
    for content in chat.history:
        part = content.parts[0]
        logger.info(content.role, "->", type(part).to_dict(part))
        logger.info('-'*80)
    logger.info('\n\n')
"""

def geminiRespuesta(userText):
    model = genai.GenerativeModel( model_name="gemini-1.5-flash", generation_config=generation_config,)
    chat = model.start_chat()
    response = chat.send_message(userText, safety_settings=None)
    return response.text


def erroresJSON(logger, userTextCopy, respuesta):
    logger.error('\n---NO SE CREO UN FORMATO JSON CORRECTO---\n')
    logger.error('---MENSAJE USUARIO:\n' + userTextCopy)
    logger.error('\n\n')
    logger.error('---MENSAJE MAQUINA:\n' + respuesta)
    logger.error('\n\n')

#Cambiar el numero de preguntas 
def revisar_JSON(userText: str):
    userTextCopy = userText + prompt_parts
    intentos, num_max_int = 0, 5
    respuesta: str = ''
    mensajes = ['Arregla el fromato JSON del examen como en el ejemplo: ', 'El formato del examen está mal arreglalo: ',
                'Dale el formato JSON correcto: ', ' Arregla el fromato JSON del examen para que sea valido: ']
    while (intentos < num_max_int):
        try:
            respuesta = geminiRespuesta(userTextCopy)
            respuesta = eliminar_cadenas(respuesta)
            json.loads(respuesta)
            return respuesta
        except json.JSONDecodeError:
            intentos += 1
            userTextCopy = mensajes[random.randint(0, 3)] + respuesta + prompt_parts
            erroresJSON(logger, userTextCopy, respuesta)
        except InternalServerError as e:
            intentos += 1
            logger.error("Ocurrió un error interno:" + str(e))

    if (intentos == num_max_int):
        respuesta = "No se pudo crear el examen. Por favor, ingrese otra instruccion."
    return respuesta


# Procesa la pregunta primero para ver como reacciona el modelo
def procesar_preg(userText):
    respuesta = revisar_JSON(userText)

    # Una vez procesada la respuesta, se guarda la pregunta del usuario y la respuesta del modelo
    Pregunta.objects.create(role="user", parts=userText)
    Pregunta.objects.create(role="model", parts=respuesta)
