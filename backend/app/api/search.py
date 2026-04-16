import torch
INDEX_NAME_DEFAULT="projects"
INDEX_NAME_N_GRAM="projects_n_gram"
INDEX_NAME_EMBEDDING="projects_embedding"

from elastic_transport import ObjectApiResponse
from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from sentence_transformers import SentenceTransformer
from ..search.get_client import get_es_client
from ..loggers.logger import logger 

router = APIRouter(
    prefix="/search",
    tags=["search"]
)

'''
API Endpoints — Search Router
SEARCH

GET    /search/project_search/        - KNN/embedding vector search
         ?query, ?skip, ?limit, ?year

POST   /search/                        - Index a new product into all 3 indexes
         body: { title, description, price, ... }
         auto-generates embedding → indexes into default + n-gram + embedding

DELETE /search/{doc_id}/               - Remove product from default index only
'''

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = SentenceTransformer("all-MiniLM-L6-v2").to(device)

def get_total_hits(response: ObjectApiResponse) -> int:
    logger.info(f"Total hits from response {response['hits']['total']['value']}")
    return response["hits"]["total"]["value"]

def calculate_max_pages(total_hits: int, limit: int) -> int:
    logger.info(f"Maximum pages can be sent {(total_hits + limit - 1) // limit}")
    return (total_hits + limit - 1) // limit

def handle_error(e: Exception) -> HTMLResponse:
    error_message = f"An error occurred: {str(e)}"
    logger.error("Error occured and HTMLResponse is going to handle it {e}")
    return HTMLResponse(content=error_message, status_code=500)

@router.get("/semantic_search/")
async def semantic_search(
    search_query: str, skip: int = 0, limit: int = 10, year: str | None = None
) :
    try:
        es = get_es_client(max_retries=1, sleep_time=0)
        embedded_query = model.encode(search_query)

        query = {
            "bool": {
                "must": [
                    {
                        "knn": {
                            "field": "embedding",
                            "query_vector": embedded_query,
                            # Because we have 3333 documents, we can return them all.
                            "k": 1e4,
                        }
                    }
                ]
            }
        }

        if year:
            query["bool"]["filter"] = [
                {
                    "range": {
                        "date": {
                            "gte": f"{year}-01-01",
                            "lte": f"{year}-12-31",
                            "format": "yyyy-MM-dd",
                        }
                    }
                }
            ]

        response = es.search(
            index=INDEX_NAME_EMBEDDING,
            body={
                "query": query,
                "from": skip,
                "size": limit,
            },
            filter_path=[
                "hits.hits._source",
                "hits.hits._score",
                "hits.total",
            ],
        )

        total_hits = get_total_hits(response)
        max_pages = calculate_max_pages(total_hits, limit)

        return {
            "hits": response["hits"].get("hits", []),
            "max_pages": max_pages,
        }
    except Exception as e:
        return handle_error(e)

