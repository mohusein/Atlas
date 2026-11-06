from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Atlas API"
    app_env: str = "development"
    database_url: str = "postgresql+psycopg://atlas:atlas@localhost:5432/atlas"
    redis_url: str = "redis://localhost:6379/0"
    secret_key: str = "development-only-change-me"
    jwt_secret_key: str = "development-only-change-me-too"
    max_upload_size_mb: int = 25
    chunk_size_tokens: int = 700
    chunk_overlap_tokens: int = 100
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


@lru_cache
def get_settings() -> Settings:
    return Settings()
