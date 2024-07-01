from fastapi import HTTPException, status, Depends
from pymongo.errors import PyMongoError
from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from pydantic import EmailStr
from jwt import InvalidTokenError
import jwt
from bson import ObjectId
from datetime import datetime

from app.models.token import Token
from app.utils.security import get_password_hash, verify_password, create_token
from app.config.settings import settings
from app.config.database import mongo_client
from app.services.mail import send_successful_account_creation_mail


database = mongo_client["LearnCodeDB"]
users_collection = database["users"]

def get_users_collection():
    return users_collection

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


async def create_user_account(user_dict, background_tasks, db ):
    """Create a new user account

    Args:
        user_dict (User): User model
        db (Database): Database connection

    Raises:
        HTTPException: User already exists

    Returns:
        User: User model
    """
    # check if user already exists
    user_exists = await db.find_one({"email": user_dict.email})
    if user_exists:
        raise HTTPException(status_code=400, detail="User already exists")
    # create user
    user_dict.password = get_password_hash(user_dict.password)
    user_dict.created_at = datetime.now(tz=timezone.utc)
    user_dict.updated_at = datetime.now(tz=timezone.utc)
    result = await db.insert_one(user_dict.dict())
    
    # for inserting blank values in other collections for user
    await insert_blank_values_for_user(result.inserted_id)
    # await send_successful_account_creation_mail(user_dict, background_tasks)
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
        data={"user_id": str(user["_id"]), "type": "access"},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    refresh_token = create_token(
        data={"user_id": str(user["_id"]), "type": "refresh"},
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}
    

async def get_new_access_token(token):
    """ Get new access token

    Args:
        token (str): Refresh token

    Raises:
        HTTPException: Could not validate credentials

    Returns:
        access_token, token_type
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.REFRESH_SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("user_id")
        token_type: str = payload.get("type")
        if user_id is None:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    if token_type != "refresh":
        raise credentials_exception
    access_token = create_token(
        data={"user_id": user_id, "type": "access"},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return {"access_token": access_token, "token_type": "bearer"}


async def forgot_password(username_or_email, db):
    """Forgot password

    Args:
        username_or_email (str): Username or email
        db (Database): Database connection
    
    Raises:
        HTTPException: Invalid email or username

    Returns:
        dict: Response message
    """
    username_or_email_exists = await db.find_one({"$or": [{"username": username_or_email}, {"email": username_or_email}]})
    if not username_or_email_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or username",
        )
    # logic to send verification code to user
    return {"message": "correct username or email. proceed with forgot password request"}


async def reset_password(username, new_password, db):
    """Reset password

    Args:
        username (str): Username
        new_password (str): New password
        db (Database): Database connection

    Returns:
        dict: Response message
    """
    new_password = get_password_hash(new_password)
    await db.update_one({"username": username}, {"$set": {"password": new_password, "updated_at": datetime.now(tz=timezone.utc)}})
    return {"message": "Password reset successful"}
    

async def get_token_payload(token, db):
    """ Get token payload

    Args:
        token (str): Access token

    Raises:
        HTTPException: Could not validate credentials

    Returns:
        dict: Token payload
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.ACCESS_SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    user = db.find_one({"_id": ObjectId(user_id)})
    if not user:
        return credentials_exception
    return {"user_id": user_id}


async def insert_blank_values_for_user(user_id):
    """Insert blank values for user_profiles and user_activities

    Args:
        user_id (str): User ID
        db (Database): Database connection

    Returns:
        None
    """
    await database["user_profiles"].insert_one({"user_id": ObjectId(user_id), "profile_pic": "https://avatar.iran.liara.run/public/boy?username=Ash", "bio": "Set your bio", "following": [], "followers": [], "level": "Noob"})
    await database["user_activities"].insert_one({"user_id": ObjectId(user_id), "codes_uploaded": [], "posts_posted": [], "questions_asked": [], "answers_given": [], "codes_saved": [], "posts_saved": [], "questions_saved": [], "answers_saved": [], "engagement_streak": []})