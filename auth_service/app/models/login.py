from pydantic import BaseModel, EmailStr

class Login(BaseModel):
    username_or_email : str | EmailStr
    password: str
