from fastapi import APIRouter, Depends, HTTPException, status, Header
from typing import Annotated
from pydantic import EmailStr
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi import BackgroundTasks

from app.models.user import User
from app.services import auth



auth_router = APIRouter(tags=["auth"], responses={404: {"description": "Not found"}})
get_current_user = auth.get_current_user
get_users_collection = auth.get_users_collection


@auth_router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
async def register_user(user_dict: User, background_tasks: BackgroundTasks, db=Depends(get_users_collection)):
    return await auth.create_user_account(user_dict, background_tasks, db)


@auth_router.post("/login", response_model=dict, status_code=status.HTTP_200_OK)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db=Depends(get_users_collection)):
    return await auth.login_for_access_token(db, form_data)


@auth_router.post("/refresh", response_model=dict, status_code=status.HTTP_201_CREATED)
async def get_access_token(token: str = Header(...)):
    return await auth.get_new_access_token(token)


@auth_router.post("/forgot-password", response_model=dict, status_code=status.HTTP_200_OK)
async def forgot_password(username_or_email: str | EmailStr, db=Depends(get_users_collection)):
    return await auth.forgot_password(username_or_email, db)


@auth_router.post("/reset-password", response_model=dict, status_code=status.HTTP_200_OK)
async def reset_password(username: str, new_password: str, db=Depends(get_users_collection)):
    return await auth.reset_password(username, new_password, db)


@auth_router.get("/protected", response_model=dict, status_code=status.HTTP_200_OK)
async def protected_route(current_user: Annotated[User, Depends(get_current_user)]):
    return {"message": "This is a protected route"}