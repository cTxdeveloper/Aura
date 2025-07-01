from beanie import Document, Link, PydanticObjectId
from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional
from datetime import datetime
from .user import User, UserOut

class Contact(BaseModel):
    name: str
    company: str
    title: str
    linkedin_url: HttpUrl

class ConnectionListBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=100)
    description: str = Field(..., min_length=20, max_length=1000)
    category: str
    price: float = Field(..., gt=0)

class ConnectionListCreate(ConnectionListBase):
    contacts: List[Contact]

class ConnectionListUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None

class ConnectionListOut(ConnectionListBase):
    id: PydanticObjectId = Field(..., alias="_id")
    creator: UserOut
    purchase_count: int
    created_at: datetime
    contact_count: int

class ConnectionList(Document):
    title: str
    description: str
    category: str
    price: float
    creator: Link[User]
    contacts: List[dict] # Storing as dicts
    purchase_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "connection_lists"