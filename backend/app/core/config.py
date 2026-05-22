from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # This tells Pydantic to look for a .env file in the project root
    model_config = SettingsConfigDict(
        env_file="../.env", 
        env_file_encoding="utf-8",
        extra="ignore"
    )

    APP_NAME: str = "QuesMint API"
    DEBUG: bool = True
    
    # Supabase Configuration
    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str
    SUPABASE_JWT_SECRET: str
    
    # Gemini Configuration
    GEMINI_API_KEY: str
    
    BACKEND_CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173"

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.BACKEND_CORS_ORIGINS.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
