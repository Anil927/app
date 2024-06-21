from pydantic import BaseModel, EmailStr

class User(BaseModel):
    full_name: str
    email: EmailStr
    username: str
    password: str
    phone_number: int | None = None

