from pydantic import BaseSettings, AnyHttpUrl
from typing import List

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str

    # OpenAI
    OPENAI_API_KEY: str

    # File Uploads
    UPLOAD_PATH: str = "/app/uploads"
    MAX_FILE_SIZE_MB: int = 100

    # CORS
    CORS_ORIGINS: List[AnyHttpUrl] = []

    # JWT
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

settings = Settings()
