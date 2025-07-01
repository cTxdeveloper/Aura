from beanie import Document, Link, PydanticObjectId
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
from enum import Enum
from .user import User, UserOut
from .bounty import Bounty, BountyOut

class DealStatus(str, Enum):
    PENDING = "pending"
    FUNDED = "funded"
    INTRODUCTION_MADE = "introduction_made"
    COMPLETED = "completed"
    DISPUTED = "disputed"
    CANCELLED = "cancelled"

class ChatMessage(BaseModel):
    sender: UserOut
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatMessageIn(BaseModel):
    content: str

class DealOut(BaseModel):
    id: PydanticObjectId = Field(..., alias="_id")
    bounty: BountyOut
    seeker: UserOut
    connector: UserOut
    status: DealStatus
    chat_history: List[ChatMessage] = []
    created_at: datetime
    updated_at: datetime

class Deal(Document):
    bounty: Link[Bounty]
    seeker: Link[User]
    connector: Link[User]
    status: DealStatus = DealStatus.PENDING
    chat_history: List[dict] = [] # Storing as dicts for flexibility
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "deals"