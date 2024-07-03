from bson import ObjectId
from datetime import datetime, timezone

import app.schemas.code_file as schema 
from app.utils.helper_fun import get_context_info



async def get_code_files(info, limit, next_cursor, code_file_ids):
    _, db = get_context_info(info)
    try:
        code_files = None

        # check if code_file_ids is there
        if code_file_ids:
            code_files = await db.code_files.find({"_id": {"$in": [ObjectId(code_file_id) for code_file_id in code_file_ids]}}).to_list(None)
        else:
            query = {}
            if next_cursor:
                query["_id"] = {"$lt": ObjectId(next_cursor)}

            # we will implement custom logic here later to fetch appropriate feed code_files for user

            code_files = db.code_files.find(query).sort("_id", -1).limit(limit)
            code_files = await code_files.to_list(length=limit)

        if not code_files:
            return schema.CodeFileResponse(
                success=True,
                message="No code_files found"
            )

        code_file_list = []
        for code_file in code_files:
            user = await db.user_profiles.find_one({"user_id": ObjectId(code_file["user_id"])})
            code_file_list.append(schema.CodeFile(
                _id=code_file["_id"],
                code_title=code_file["code_title"],
                file_type=code_file["file_type"],
                file_urls=code_file["file_urls"],
                views=code_file["views"],
                comments_count=code_file["comments_count"],
                upload_date=code_file["upload_date"],
                user=schema.User(
                    profile_pic=user["profile_pic"],
                    username=(await db.users.find_one({"_id": ObjectId(code_file["user_id"])}))["username"],
                    level=user["level"],
                )
            ))
        
        next_cursor = str(code_file_list[-1]._id) if len(code_file_list) == limit else None        

        return schema.CodeFileResponse(
            success=True,
            message="CodeFiles retrieved successfully",
            code_file=code_file_list,
            next_cursor=next_cursor
            )
    except Exception as e:
        return schema.CodeFileResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def get_comments_for_code_files(info, limit, code_file_id, next_cursor):
    _, db = get_context_info(info)
    try:
        query = {}
        if next_cursor:
            query["_id"] = {"$lt": ObjectId(next_cursor)}

        query["code_file_id"] = ObjectId(code_file_id)

        # we will implement custom logic here later to fetch appropriate comments for user

        comments = db.code_file_comments.find(query).sort("_id", -1).limit(limit)
        comments = await comments.to_list(length=limit)

        if not comments:
            return schema.CodeFileCommentResponse(
                success=True,
                message="No comments found"
            )

        comment_list = []
        for comment in comments:
            user = await db.user_profiles.find_one({"user_id": ObjectId(comment["user_id"])})
            comment_list.append(schema.CodeFileComment(
                _id=comment["_id"],
                comment_text=comment["comment_text"],
                created_at=comment["created_at"],
                updated_at=comment["updated_at"],
                user=schema.User(
                    profile_pic=user["profile_pic"],
                    username=(await db.users.find_one({"_id": ObjectId(comment["user_id"])}))["username"],
                    level=user["level"],
                )
            ))

        next_cursor = str(comment_list[-1]._id) if len(comment_list) == limit else None

        return schema.CodeFileCommentResponse(
            success=True,
            message="Comments retrieved successfully",
            comments=comment_list,
            next_cursor=next_cursor
        )
    except Exception as e:
        return schema.CodeFileCommentResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def get_views_count_for_code_files(info, code_file_id):
    _, db = get_context_info(info)
    try:
        code_file = await db.code_files.find_one({"_id": ObjectId(code_file_id)})
        if not code_file:
            return schema.CodeFileViewsCountResponse(
                success=True,
                message="Views not found"
            )
        return schema.CodeFileViewsCountResponse(
            success=True,
            message="Views count retrieved successfully",
            count=schema.CodeFileViewsCount(views=code_file["views"])
        )
    except Exception as e:
        return schema.CodeFileViewsCountResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )

async def get_comments_count_for_code_files(info, code_file_id):
    _, db = get_context_info(info)
    try:
        code_file = await db.code_files.find_one({"_id": ObjectId(code_file_id)})
        if not code_file:
            return schema.CodeFileCommentCountResponse(
                success=True,
                message="Comments not found"
            )
        return schema.CodeFileCommentCountResponse(
            success=True,
            message="Comments count retrieved successfully",
            count=schema.CodeFileCommentCount(count=code_file["comments_count"])
        )
    except Exception as e:
        return schema.CodeFileCommentCountResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def comment_on_code_file(info, code_file_id, comment_text):
    user_id, db = get_context_info(info)
    try:
        result = await db.code_file_comments.insert_one({
            "code_file_id": ObjectId(code_file_id),
            "user_id": ObjectId(user_id),
            "comment_text": comment_text,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(tz=timezone.utc)
        })
        if result.inserted_id:
            code_file = await db.code_files.find_one({"_id": ObjectId(code_file_id)})
            await db.code_files.update_one(
                {"_id": ObjectId(code_file_id)},
                {"$set": {"comments_count": code_file["comments_count"] + 1}}
            )
            comment = await db.code_file_comments.find_one({"_id": result.inserted_id})
            comment = schema.CommentOnCodeFile(
                _id=comment["_id"],
                comment_text=comment["comment_text"],
                created_at=comment["created_at"],
                updated_at=comment["updated_at"]
            )
            return schema.CommentOnCodeFileResponse(
                success=True,
                message="Comment created successfully",
                comment=comment
            )
        else:
            return schema.CommentOnCodeFileResponse(
                success=False,
                message="Failed to create the comment"
            )
    except Exception as e:
        return schema.CommentOnCodeFileResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def update_comment_on_code_file(info, _id, new_comment_text):
    user_id, db = get_context_info(info)
    try:
        result = await db.code_file_comments.update_one(
            {"_id": ObjectId(_id), "user_id": ObjectId(user_id)},
            {"$set": {
                "comment_text": new_comment_text,
                "updated_at": datetime.now(tz=timezone.utc)
            }}
        )
        if result.modified_count == 1:
            comment = await db.code_file_comments.find_one(
                {"_id": ObjectId(_id), "user_id": ObjectId(user_id)}
            )
            comment = schema.CommentOnCodeFile(
                _id=comment["_id"],
                comment_text=comment["comment_text"],
                created_at=comment["created_at"],
                updated_at=comment["updated_at"]
            )
            return schema.CommentOnCodeFileResponse(
                success=True,
                message="Comment updated successfully",
                comment=comment
            )
        else:
            return schema.CommentOnCodeFileResponse(
                success=False,
                message="Failed to update the comment"
            )
    except Exception as e:
        return schema.CommentOnCodeFileResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )

async def increase_code_file_views_count(info, code_file_id):
    _, db = get_context_info(info)
    try:
        result = await db.code_files.update_one(
            {"_id": ObjectId(code_file_id)},
            {"$inc": {"views": 1}}
        )
        if result.modified_count == 1:
            return schema.IncreaseCodeFileViewsCountResponse(
                success=True,
                message="Views count updated successfully"
            )
        else:
            return schema.IncreaseCodeFileViewsCountResponse(
                success=False,
                message="Failed to update views count"
            )
    except Exception as e:
        return schema.IncreaseCodeFileViewsCountResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )



