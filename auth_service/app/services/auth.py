from fastapi import HTTPException, status, Depends
from pymongo.errors import PyMongoError
from datetime import timedelta
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from pydantic import EmailStr
import jwt

from app.models.token import Token, TokenData
from app.utils.security import get_password_hash, verify_password, create_token
from app.config.settings import settings
from app.config.database import mongo_client




db = mongo_client["LearnCodeDB"]
users_collection = db["users"]

def get_users_collection():
    return users_collection

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


async def create_user_account(user_dict, db):
    """Create a new user account

    Args:
        user_dict (User): User model
        db (Database): Database connection

    Raises:
        HTTPException: User already exists

    Returns:
        User: User model
    """
    try:
        # check if user already exists
        user_exists = await db.find_one({"email": user_dict.email})
        if user_exists:
            raise HTTPException(status_code=400, detail="User already exists")
        # create user
        user_dict.password = get_password_hash(user_dict.password)
        user = await db.insert_one(user_dict.dict())
    except PyMongoError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return user_dict


async def authenticate_user(db, username_or_email: str | EmailStr, password: str):
    """ Authenticate user

    Args:
        db (Database): Database connection
        username_or_email (str): Username or email
        password (str): Password
    
    Returns:
        User: User model
    """
    user = await db.find_one({"$or": [{"username": username_or_email}, {"email": username_or_email}]})
    if not user:
        return False
    if not verify_password(password, user["password"]):
        return False
    return user


async def login_for_access_token(db, form_data) -> Token:
    """Login user and return access token and refresh token

    Args:
        db (Database): Database connection
        form_data (OAuth2PasswordRequestForm): Form data

    Raises:
        HTTPException: Incorrect username or password

    Returns:
        access_token, refresh_token, token_type
    """
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_token(
        data={"sub": user["username"], "type": "access"},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    refresh_token = create_token(
        data={"sub": user["username"], "type": "refresh"},
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}
    


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db=Depends(get_users_collection)):
    """ Get current user

    Args:
        token (str): Access token

    Raises:
        HTTPException: Could not validate credentials

    Returns:
        User: User model
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.ACCESS_SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = await db.find_one({"username": token_data.username})
    if user is None:
        raise credentials_exception
    return user


    