import os
from functools import lru_cache
from pydantic_settings import BaseSettings
from dotenv import load_dotenv



load_dotenv()

class Settings(BaseSettings):
    MONGO_URI: str = os.getenv("MONGO_URI")
    AUTH_SERVICE_URL: str = os.getenv("AUTH_SERVICE_URL")

    
@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()