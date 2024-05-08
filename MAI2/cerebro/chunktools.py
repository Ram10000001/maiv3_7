import google.ai.generativelanguage as glm
import os
from django.conf import settings
from google.oauth2 import service_account
import logging
from google_labs_html_chunker.html_chunker import HtmlChunker
from .tools import abrirPDF

service_account_file_name = os.path.join(settings.BASE_DIR, 'static', 'json', 'llmmai-b265cdb0d7fa.json')
credentials = service_account.Credentials.from_service_account_file(service_account_file_name)
scoped_credentials = credentials.with_scopes(['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/generative-language.retriever'])
generative_service_client = glm.GenerativeServiceClient(credentials=scoped_credentials)
retriever_service_client = glm.RetrieverServiceClient(credentials=scoped_credentials)
permission_service_client = glm.PermissionServiceClient(credentials=scoped_credentials)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def printChunks(chunks, document_resource_name):
    # for chunk in chunks:
    #    logger.info(chunk)
    create_chunk_requests = []
    for chunk in chunks:
        create_chunk_requests.append(glm.CreateChunkRequest(parent=document_resource_name, chunk=chunk))
    request = glm.BatchCreateChunksRequest(parent=document_resource_name, requests=create_chunk_requests)
    response = retriever_service_client.batch_create_chunks(request)
    logger.info(response)


def printChunkState(document_resource_name):
    request = glm.ListChunksRequest(parent=document_resource_name)
    list_chunks_response = retriever_service_client.list_chunks(request)
    for index, chunks in enumerate(list_chunks_response.chunks):
        logger.info(f'\nChunk # {index + 1}')
        logger.info(f'Resource Name: {chunks.name}')
        # Only ACTIVE chunks can be queried.
        logger.info(f'State: {glm.Chunk.State(chunks.state).name}')


def checkChunkState(corpus_resource_name):
    request = glm.ListChunksRequest(parent=corpus_resource_name)
    list_chunks_response = retriever_service_client.list_chunks(request)
    for chunks in enumerate(list_chunks_response.chunks):
        if glm.Chunk.State(chunks.state).name == 'STATE_PENDING_PROCESSING':
            return False
    return True


def splitIntoSmallerPassages(text, max_tokens):
    words = text.split()
    passages = []
    for i in range(0, len(words), max_tokens):
        passage = ' '.join(words[i:i+max_tokens])
        passages.append(passage)
    return passages


def createChunks(passages, MAX_TOKENS):
    chunks = []
    for passage in passages:
        # Check the size of the passage
        if len(passage.split()) > MAX_TOKENS:
            # If the passage is too long, split it into smaller passages
            split_passages = splitIntoSmallerPassages(passage, MAX_TOKENS)
            for split_passage in split_passages:
                chunk = glm.Chunk(data={'string_value': split_passage})
                chunks.append(chunk)
        else:
            # If the passage is not too long, create a chunk as usual
            chunk = glm.Chunk(data={'string_value': passage})
            chunks.append(chunk)
    return chunks


def chunckFile(document_resource_name):
    MAX_TOKENS = 512  # Replace 512 with the actual token limit of your model
    text = abrirPDF("static/pdf/test.pdf")
    # Chunk the file using HtmlChunker
    chunker = HtmlChunker(max_words_per_aggregate_passage=200, 
                          greedily_aggregate_sibling_nodes=True,
                          html_tags_to_exclude={"noscript", "script", "style"},)
    passages = chunker.chunk(text)
    # Create `Chunk` entities.
    chunks = createChunks(passages, MAX_TOKENS)
    # Print the chunks
    printChunks(chunks, document_resource_name)
    printChunkState(document_resource_name)