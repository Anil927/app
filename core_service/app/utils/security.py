# from functools import wraps
from strawberry.fastapi import BaseContext
from strawberry.types import Info
from fastapi import Depends
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
import httpx
import strawberry
from strawberry.fastapi import BaseContext

from app.config.settings import settings
from app.config.database import mongo_client


oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.AUTH_SERVICE_URL}/login")

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    """ Checks if the user's token is valid

    Args:
        token (str): The user's token

    Raises: 
        HTTPException: If the token is invalid

    Returns:
        dict: The user's data
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{settings.AUTH_SERVICE_URL}/validate-token", headers={"Authorization": f"Bearer {token}"})
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError:
            raise HTTPException(status_code=401, detail="Invalid token")


# Define a custom context class that inherits from BaseContext
class CustomContext(BaseContext):
    def __init__(self, user_id: str, db):
        self.user_id = user_id
        self.db = db

def get_context(
    # current_user: dict = Depends(get_current_user)
) -> CustomContext:
    # user_id = current_user["user_id"]
    user_id = "667ff743ca97463432e8f639"  # temporary
    db = mongo_client['LearnCodeDB']
    return CustomContext(user_id=user_id, db=db)


# def login_required():
#     def decorator(resolver):
#         @wraps(resolver)
#         def wrapper(*args, **kwargs):
#             info = next((arg for arg in args if isinstance(arg, Info)), None)
#             if info and info.context.get("user_id"):
#                 return resolver(*args, **kwargs)
#             raise HTTPException(status_code=401, detail="Unauthorized")
#         return wrapper
#     return decorator
