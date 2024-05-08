import google.ai.generativelanguage as glm
import os
from django.conf import settings
from google.oauth2 import service_account
import logging
#from .chunktools import chunckFile, checkChunkState
from .tools import leerTXT, generarTXT
from django.core.files.storage import default_storage


class Route:
    CORPUS = 'static/txt/corpusname.txt'
    DOCUMENT = 'static/txt/corpusdocument.txt'


service_account_file_name = os.path.join(settings.BASE_DIR, 'static', 'json', 'llmmai-b265cdb0d7fa.json')
credentials = service_account.Credentials.from_service_account_file(service_account_file_name)
scoped_credentials = credentials.with_scopes(['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/generative-language.retriever'])
generative_service_client = glm.GenerativeServiceClient(credentials=scoped_credentials)
retriever_service_client = glm.RetrieverServiceClient(credentials=scoped_credentials)
permission_service_client = glm.PermissionServiceClient(credentials=scoped_credentials)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def crearCorpus(name):
    example_corpus = glm.Corpus(display_name=name)
    create_corpus_request = glm.CreateCorpusRequest(corpus=example_corpus)
    # Make the request
    create_corpus_response = retriever_service_client.create_corpus(create_corpus_request)
    # global corpus_resource_name
    # guarda la ruta en un archivo de texto
    corpus_resource_name = create_corpus_response.name
    generarTXT(contenido=corpus_resource_name, route=Route.CORPUS)
    # logger.info(create_corpus_response)


def requestCorpus(corpus_resource_name):
    get_corpus_request = glm.GetCorpusRequest(name=corpus_resource_name)
    # Make the request
    get_corpus_response = retriever_service_client.get_corpus(get_corpus_request)
    # Print the response
    logger.info(get_corpus_response)


def crearDocument(corpus_resource_name):
    # Create a document with a custom display name.
    example_document = glm.Document(display_name="test document")
    # Make the request
    create_document_request = glm.CreateDocumentRequest(parent=corpus_resource_name, document=example_document)
    create_document_response = retriever_service_client.create_document(create_document_request)
    # Set the `document_resource_name` for subsequent sections.
    document_resource_name = create_document_response.name
    generarTXT(contenido=document_resource_name, route=Route.DOCUMENT)
    # logger.info(document_resource_name)


def requestDocument(document_resource_name):
    # Make the request
    get_document_request = glm.GetDocumentRequest(name=document_resource_name)
    # document_resource_name is a variable set in the "Create a document" section.
    get_document_response = retriever_service_client.get_document(get_document_request)
    # Print the response
    logger.info(get_document_response)


def deleteCorpus(corpus_resource_name):
    # Set force to False if you don't want to delete non-empty corpora.
    req = glm.DeleteCorpusRequest(name=corpus_resource_name, force=True)
    delete_corpus_response = retriever_service_client.delete_corpus(req)
    logger.info("Successfully deleted corpus: " + corpus_resource_name)


def tous(corpusName='testDjango'):
    if default_storage.exists('static/txt/corpusname.txt'):
        return
    crearCorpus(corpusName)
    corpusAccess = leerTXT(Route.CORPUS)
    crearDocument(corpusAccess)
    documentAccess = leerTXT(Route.DOCUMENT)
    chunckFile(documentAccess)


def userQuery(user_query, corpus_resource_name):
    if not checkChunkState:
        logger.info('No se han cargado los chunks. Intenta mas tarde')
        return
    
    user_query = user_query
    answer_style = "ABSTRACTIVE"  # Or VERBOSE, EXTRACTIVE
    MODEL_NAME = "models/aqa"

    # Make the request
    logger.info('USERQUERY FLAG \n')
    content = glm.Content(parts=[glm.Part(text=user_query)])
    # retriever_config = glm.SemanticRetrieverConfig(source=corpus_resource_name, query=content)
    retriever_config = glm.SemanticRetrieverConfig(source=corpus_resource_name, query=content)
    req = glm.GenerateAnswerRequest(model=MODEL_NAME,
                                    contents=[content],
                                    semantic_retriever=retriever_config,
                                    answer_style=answer_style)
    aqa_response = generative_service_client.generate_answer(req)
    logger.info('aqa response: \n')
    logger.info(aqa_response)
    return aqa_response
