from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    CHROMA_DB_HOST: str = "chromadb"
    CHROMA_DB_PORT: int = 8000
    OPENAI_API_KEY: str | None = None
    OLLAMA_BASE_URL: str = "http://host.docker.internal:11434"
    SECRET_KEY: str = "your-super-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
