from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Aura Marketplace"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    MONGO_CONNECTION_STRING: str
    ADMIN_EMAIL: str

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()