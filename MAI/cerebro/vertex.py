from typing import Optional
from .prompt import prompt_parts
import vertexai
from vertexai.preview.generative_models import (
    GenerationResponse,
    GenerativeModel,
    grounding,
    Tool,
)


def generate_text_with_grounding(
    project_id: str, location: str, data_store_path: Optional[str] = None
) -> GenerationResponse:
    # Initialize Vertex AI
    vertexai.init(project=project_id, location=location)

    # Load the model
    model = GenerativeModel(model_name="gemini-1.0-pro")

    # Create Tool for grounding
    if data_store_path:
        # Use Vertex AI Search data store
        # Format: projects/{project_id}/locations/{location}/collections/default_collection/dataStores/{data_store_id}
        tool = Tool.from_retrieval(
            grounding.Retrieval(grounding.VertexAISearch(
                datastore=data_store_path))
        )
    else:
        # Use Google Search for grounding (Private Preview)
        tool = Tool.from_google_search_retrieval(
            grounding.GoogleSearchRetrieval())

    prompt = 'What are the price, available colors, and storage size options of a Pixel Tablet?'
    response = model.generate_content(prompt, tools=[tool])

    return response
