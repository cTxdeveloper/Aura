from beanie import Document, Link, PydanticObjectId
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from .user import User, UserOut

class BountyBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=100)
    description: str = Field(..., min_length=20, max_length=2000)
    category: str
    amount: float = Field(..., gt=0, description="The reward amount for the bounty")

class BountyCreate(BountyBase):
    pass

class BountyUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=5, max_length=100)
    description: Optional[str] = Field(None, min_length=20, max_length=2000)
    category: Optional[str] = None
    amount: Optional[float] = Field(None, gt=0)
    is_active: Optional[bool] = None

class BountyOut(BountyBase):
    id: PydanticObjectId = Field(..., alias="_id")
    creator: UserOut
    is_active: bool
    created_at: datetime

class Bounty(Document):
    title: str
    description: str
    category: str
    amount: float
    creator: Link[User]
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "bounties"