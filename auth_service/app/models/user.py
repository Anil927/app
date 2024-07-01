from pydantic import BaseModel, EmailStr
from datetime import datetime

class User(BaseModel):
    username: str
    full_name: str
    email: EmailStr
    password: str
    phone_number: int | None = None
    created_at: datetime
    updated_at: datetime

