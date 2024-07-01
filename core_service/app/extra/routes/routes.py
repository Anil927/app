# Extra APIs that are better to handle in traditional REST APIs rather than in GRAPHQL

from fastapi import HTTPException, APIRouter, status, Depends, UploadFile, File

from app.extra.services.services import save_image_to_local
from app.utils.security import get_current_user
import app.extra.services.services as services
from app.config.database import mongo_client



extra_router = APIRouter()

def get_db():
    return mongo_client['LearnCodeDB']

@extra_router.post("/post/createpost", status_code=status.HTTP_201_CREATED)
async def create_post(image: UploadFile, current_user=Depends(get_current_user), db=Depends(get_db)):
    return await services.create_post(image, current_user, db)


@extra_router.put("/user/profilepic", status_code=status.HTTP_200_OK)
async def update_profile_pic(image: UploadFile, current_user=Depends(get_current_user), db=Depends(get_db)):
    return await services.update_profile_pic(image, current_user, db)


@extra_router.post("/code/upload", status_code=status.HTTP_201_CREATED)
async def upload_code_file(code_title: str, file_type: str, files: list[UploadFile], current_user=Depends(get_current_user), db=Depends(get_db)):
    return await services.upload_code_file(code_title, file_type, files, current_user, db)


    
