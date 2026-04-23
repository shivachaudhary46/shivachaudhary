from fastapi import FastAPI
from backend.app.api import getClients, meetings, search, connectSheet
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.app.loggers.logger import logger
import json

@asynccontextmanager
async def lifespan(app: FastAPI):
    try: 
        print("Life span started")
        from backend.app.search.index_data import index_data
        with open("./backend/app/search/data/projects.json") as f: 
            documents = json.load(f)
        index_data(documents=documents, use_n_gram_tokenizer=False)
        logger.info("Indexing complete!")
    except Exception as e: 
        logger.info(f"Indexing failed: {e}")
    yield 

app = FastAPI(
    title="Shiva Chaudhary Portfolio", 
    description="A portfolio website.", 
    version="1.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://shivachaudhary-production.up.railway.app",
        "http://localhost:3000",
        "http://localhost:5500",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

@app.get("/")
def root(): 
    return {"message": "Welcome to Shiva Chaudhary Portfolio", "status": "running"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy", 
    }

app.include_router(meetings.router)
app.include_router(getClients.router)
app.include_router(search.router)
app.include_router(connectSheet.router)

if __name__ == "__main__": 
    import uvicorn
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port="8000", 
        reload=True, 
        reload_excludes=["backend/logs/*"]
    )