from bson import ObjectId

import app.schemas.user_profile as schema 
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


async def get_followings(info, limit, next_cursor):
    user_id, db = get_context_info(info)
    try:
        following_list = []
        query = {"user_id": ObjectId(user_id)}
        if next_cursor:
            query["_id"] = {"$lt": ObjectId(next_cursor)}
        followings = db.user_relationships.find(query).sort("_id", -1).limit(limit)
        followings = await followings.to_list(length=limit)
        following_target_ids = [[following["target_id"], following["created_at"]] for following in followings]

        for following_target_id in following_target_ids:
            following = await db.user_profiles.find_one({"user_id": ObjectId(following_target_id[0])})
            following_list.append(schema.UserFollowerOrFollowing(
                created_at=following_target_id[1],
                user=schema.User(
                    username=(await db.users.find_one({"_id": ObjectId(following_target_id[0])}))["username"],
                    profile_pic=following["profile_pic"],
                    level=following["level"]
                )
            ))

        next_cursor = str(following_list[-1]._id) if len(following_list) == limit else None

        return schema.UserFollowersOrFollowingsResponse(
            success=True,
            message="Followers fetched successfully",
            followers_or_followings=following_list,
            next_cursor=next_cursor
        )
    except Exception as e:
        return schema.UserFollowersOrFollowingsResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )

async def get_followers(info, limit, next_cursor):
    user_id, db = get_context_info(info)
    try:
        follower_list = []
        query = {"target_id": ObjectId(user_id)}
        if next_cursor:
            query["_id"] = {"$lt": ObjectId(next_cursor)}
        followers = db.user_relationships.find(query).sort("_id", -1).limit(limit)
        followers = await followers.to_list(length=limit)
        follower_user_ids = [[follower["user_id"], follower["created_at"]] for follower in followers]

        for follower_user_id in follower_user_ids:
            follower = await db.user_profiles.find_one({"user_id": ObjectId(follower_user_id[0])})
            follower_list.append(schema.UserFollowerOrFollowing(
                created_at=follower_user_id[1],
                user=schema.User(
                    username=(await db.users.find_one({"_id": ObjectId(follower_user_id[0])}))["username"],
                    profile_pic=follower["profile_pic"],
                    level=follower["level"]
                )
            ))

        next_cursor = str(follower_list[-1]._id) if len(follower_list) == limit else None

        return schema.UserFollowersOrFollowingsResponse(
            success=True,
            message="Followers fetched successfully",
            followers_or_followings=follower_list,
            next_cursor=next_cursor
        )
    except Exception as e:
        return schema.UserFollowersOrFollowingsResponse(
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
    


