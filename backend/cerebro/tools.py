import logging
import PyPDF2
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def leerTXT(route):
    contenido = ""
    with open(route, 'r') as archivo:
        contenido += archivo.read().strip()
    return contenido


def generarTXT(contenido, route):
    contenido = contenido
    ruta_completa = route
    with open(ruta_completa, 'w') as archivo:
        archivo.write(contenido)
    logger.info("Archivo generado y escrito exitosamente.")


def abrirPDF(route):
    with open(route, "rb") as f:
        pdf_reader = PyPDF2.PdfReader(f)
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
    return text
