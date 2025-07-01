from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import uvicorn

from app.core.config import settings
from app.api.v1.api import api_router
from app.models.user import User
from app.models.bounty import Bounty
from app.models.deal import Deal
from app.models.connection_list import ConnectionList

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"/api/v1/openapi.json",
    description="The Trust Engine for High-Value Professional Networking."
)

@app.on_event("startup")
async def app_init():
    """Initialize Database Connection and Beanie ODM"""
    print("Connecting to MongoDB...")
    app.db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING)
    await init_beanie(
        database=app.db_client.get_default_database(),
        document_models=[User, Bounty, Deal, ConnectionList]
    )
    print("Startup complete. Aura Trust Engine is online.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/", tags=["Root"])
def root():
    return {"message": "Aura Trust Engine is online."}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)