from fastapi import UploadFile, File, HTTPException
import os
import shutil
from bson import ObjectId
# import boto3
# from botocore.exceptions import NoCredentialsError
from PIL import Image
from datetime import datetime,timezone



STATIC_DIR = "app/../static"

def save_image_to_local(file: UploadFile):
    if not os.path.exists(STATIC_DIR):
        os.makedirs(STATIC_DIR)
    file_location = os.path.join(STATIC_DIR, file.filename)
    print(file_location)
    try:
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        print(e)
    return file_location

# def upload_to_s3(file_location: str, filename: str):
#     if AWS_ACCESS_KEY and AWS_SECRET_KEY and AWS_BUCKET_NAME:
#         s3 = boto3.client(
#             "s3",
#             aws_access_key_id=AWS_ACCESS_KEY,
#             aws_secret_access_key=AWS_SECRET_KEY
#         )
#         try:
#             s3.upload_file(file_location, AWS_BUCKET_NAME, filename)
#             return {"info": f"file '{filename}' uploaded to S3 bucket '{AWS_BUCKET_NAME}'"}
#         except NoCredentialsError:
#             return {"error": "Credentials not available"}
#     else:
#         return {"info": f"file '{filename}' saved at '{file_location}'"}


async def create_post(image, current_user, db):
    """ To create a post

    Args:
        image (UploadFile): The image file to be uploaded
        current_user (dict): The current user details
        db (Database): The database connection
    
    Returns:
        dict: The response message
    """
    try:
        Image.open(image.file)
        image.file.seek(0)  # Reset file pointer to the beginning
        image_url = save_image_to_local(image)
        # return upload_to_s3(image_url, image.filename)
    except IOError:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image")
    post_data = {
        "image_url": image_url,
        "user_id": ObjectId(current_user["user_id"]),
        "created_at": datetime.now(tz=timezone.utc)
    }
    try:
        result = await db.posts.insert_one(post_data)
        print(str(result.inserted_id))
        return {"_id": str(result.inserted_id), "message": "image posted successfully"}
    except Exception as e:
        return {"error": f"An error occurred while creating the post: {e}"}


async def update_profile_pic(image, current_user, db):
    """ Update the profile picture

    Args:
        image (UploadFile): The image file to be uploaded
        current_user (dict): The current user details
        db (Database): The database connection

    Returns:
        dict: The response message
    """

    # checking if it is a valid image
    try:
        Image.open(image.file)
    except IOError:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image")

    # updating the profile picture in database
    try:
        image_url = save_image_to_local(image)
        result = await db.user_profiles.update_one(
            {"user_id": ObjectId(current_user["user_id"])},
            {"$set": {"profile_pic": image_url}}
        )
        if result.modified_count == 1:
            return {"info": "Profile picture updated successfully"}
        else:
            return {"info": "Profile picture not updated"}
    except Exception as e:
        return {"error": f"An error occurred while updating the profile picture: {e}"}


async def upload_code_file(code_title, file_type, files, current_user, db):
    """ Upload code files
    
    Args:
        code_title (str): The title of the code file
        file_type (str): The type of the code file
        files (list[UploadFile]): The code files to be uploaded
        current_user (dict): The current user details
        db (Database): The database connection

    Returns:
        dict: The response message
    """
    
    file_urls = []
    for file in files:
        try:
            file.file.seek(0)
            file_location = save_image_to_local(file)
            # upload_to_s3(file_location, file.filename)
        except Exception as e:
            print(e)
        
        file_urls.append(file_location)

    code_file_urls = {
        "user_id": ObjectId(current_user["user_id"]),
        "code_title": code_title,
        "file_type": file_type,
        "file_urls": file_urls,
        "views": 0,
        "comments_count": 0,
        "upload_date": datetime.now(tz=timezone.utc)
    }

    try:
        result = await db.code_files.insert_one(code_file_urls)
        return {"_id": str(result.inserted_id), "message": "code files uploaded successfully"}
    except Exception as e:
        return {"error": f"An error occurred while uploading the code files: {e}"}
    



        

    



