from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET: str

    model_config = {
        "extra": "allow", 
        "env_file": ".env"
    }

settings = Settings()