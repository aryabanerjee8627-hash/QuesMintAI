from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "QuesMint API"
    app_env: str = "development"
    backend_cors_origins: str = "http://localhost:5173,http://localhost:5174"
    supabase_url: str
    supabase_jwt_secret: str
    supabase_service_role_key: str
    gemini_api_key: str

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.backend_cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
