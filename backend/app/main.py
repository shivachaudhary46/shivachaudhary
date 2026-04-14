from fastapi import FastAPI
from backend.app.api import meetings, getObject
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Shiva Chaudhary Portfolio", 
    description="A portfolio website.", 
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://127.0.0.1:3000",
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
app.include_router(meetings.router)

if __name__ == "__main__": 
    import uvicorn
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port="8000", 
        reload=True, 
        reload_excludes=["backend/logs/*"]
    )