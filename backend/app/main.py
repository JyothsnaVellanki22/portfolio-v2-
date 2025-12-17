from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Chatbot API", version="1.0.0")

# CORS Setup
origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:4200",  # Angular default port (just in case)
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Chatbot API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

from app.db.base import Base
from app.db.session import engine

@app.on_event("startup")
async def init_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

from app.api import auth, chat, documents
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(documents.router, prefix="/documents", tags=["documents"])


