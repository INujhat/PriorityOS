from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(default="", max_length=5000)
    course: str | None = Field(default=None, max_length=100)
    deadline: datetime | None = None
    importance: int = Field(default=3, ge=1, le=5)
    estimated_minutes: int = Field(default=60, ge=1, le=1440)


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)
    description: str | None = Field(default=None, max_length=5000)
    course: str | None = Field(default=None, max_length=100)
    deadline: datetime | None = None
    importance: int | None = Field(default=None, ge=1, le=5)
    estimated_minutes: int | None = Field(
        default=None, ge=1, le=1440
    )
    completed: bool | None = None


class TaskResponse(TaskCreate):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    completed: bool
    created_at: datetime
