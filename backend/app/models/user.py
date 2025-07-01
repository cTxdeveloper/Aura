from beanie import Document, PydanticObjectId
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    seeker = "seeker"
    connector = "connector"

class UserAuth(BaseModel):
    password: str = Field(..., min_length=8, description="User's password")

class UserBase(BaseModel):
    email: EmailStr
    full_name: str = Field(..., min_length=2, max_length=50)
    headline: Optional[str] = Field("New Aura Member", max_length=100)
    role: UserRole = UserRole.seeker

class UserCreate(UserAuth, UserBase):
    pass

class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=50)
    headline: Optional[str] = Field(None, max_length=100)

class UserOut(UserBase):
    id: PydanticObjectId = Field(..., alias="_id")
    reputation_score: float
    wallet_balance: float

class User(Document, UserBase):
    hashed_password: str
    reputation_score: float = 5.0
    wallet_balance: float = 0.0

    class Settings:
        name = "users"