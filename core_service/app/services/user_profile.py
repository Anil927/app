from bson import ObjectId

import app.schema.user_profile as schema 
from app.utils.helper_fun import get_context_info


async def get_profile_info(info):
    user_id, db = get_context_info(info)
    try:
        user = await db.user_profiles.find_one({"user_id": ObjectId(user_id)})
        profile = schema.UserProfile(
            profile_pic=user["profile_pic"],
            bio=user["bio"],
            following=len(user["following"]),
            followers=len(user["followers"]),
            level=user["level"]
        )
        return schema.UserProfileResponse(
            success=True,
            message="Profile info fetched successfully",
            profile=profile
        )
    except Exception as e:
        return schema.UserProfileResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )
    

async def update_bio(info, new_bio):
    user_id, db = get_context_info(info)
    try:
        result = await db.user_profiles.update_one(
            {"user_id": ObjectId(user_id)},
            {"$set": {"bio": new_bio}}
        )
        if result.modified_count == 1:
            user = await db.user_profiles.find_one({"user_id": ObjectId(user_id)})
            bio = schema.UserBio(
                _id=user["_id"],
                bio=new_bio
            )
            return schema.UserBioResponse(
                success=True,
                message="Bio updated successfully",
                bio=bio
            )
        else:
            return schema.UserBioResponse(
                success=False,
                message="Failed to update the bio"
            )
    except Exception as e:
        return schema.UserBioResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )
    


