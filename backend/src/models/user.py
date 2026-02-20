from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class User(SQLModel, table=True):
    """SQLModel for User entity"""
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    username: str = Field(unique=True, index=True)
    password_hash: str
    is_verified: bool = Field(default=False)
    verification_token: Optional[str] = None
    password_reset_token: Optional[str] = None
    password_reset_expires: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = Field(default=True)

    # Relationship
    tasks: List["Task"] = Relationship(back_populates="user")

class UserCreate(SQLModel):
    """Schema for creating a new User"""
    email: str
    username: str
    password: str

class UserUpdate(SQLModel):
    """Schema for updating a User"""
    email: Optional[str] = None
    username: Optional[str] = None

class UserResponse(SQLModel):
    """Schema for User response (excludes sensitive data)"""
    id: int
    email: str
    username: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime
