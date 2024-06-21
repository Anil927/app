from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer

from app.models.user import User
from app.services.auth import create_user_account, login_for_access_token, get_current_user, get_users_collection


auth_router = APIRouter(tags=["auth"], responses={404: {"description": "Not found"}})



@auth_router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
async def register_user(user_dict: User, db=Depends(get_users_collection)):
    return await create_user_account(user_dict, db)


@auth_router.post("/login", response_model=dict, status_code=status.HTTP_200_OK)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db=Depends(get_users_collection)):
    return await login_for_access_token(db, form_data)


@auth_router.get("/protected", response_model=dict, status_code=status.HTTP_200_OK)
async def protected_route(current_user: Annotated[User, Depends(get_current_user)]):
    return {"message": "This is a protected route"}