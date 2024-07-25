from bson import ObjectId
from datetime import datetime, timezone
import asyncio

import app.schemas.post as schema
from app.utils.helper_fun import get_context_info
from app.logging.logger import logger
from app.kafka.send_message import send_message

async def get_posts(info, limit, next_cursor, post_ids):
    user_id, db = get_context_info(info)
    try:
        posts = None

        # check if post_ids is there
        if post_ids:
            posts = await db.posts.find({"_id": {"$in": [ObjectId(post_id) for post_id in post_ids]}}).to_list(None)
        else:
            query = {}
            if next_cursor:
                query["_id"] = {"$lt": ObjectId(next_cursor)}

            # we will implement custom logic here later to fetch appropriate feed posts for user

            posts = db.posts.find(query).sort("_id", -1).limit(limit)
            posts = await posts.to_list(length=limit)

        if not posts:
            return schema.PostResponse(
                success=True,
                message="No posts found"
            )

        post_list = []
        for post in posts:
            is_bookmarked = await db.user_activities.find_one({
                "user_id": ObjectId(user_id),
                "posts_saved": {"$in": [ObjectId(post["_id"])]}
            })
            user = await db.user_profiles.find_one({"user_id": ObjectId(post["user_id"])})
            post_list.append(schema.Post(
                _id=post["_id"],
                content=post["content"],
                image_url=post["image_url"],
                likes_count=post["likes_count"],
                comments_count=post["comments_count"],
                is_bookmarked=bool(is_bookmarked),
                created_at=post["created_at"],
                user=schema.User(
                    profile_pic=user["profile_pic"],
                    username=(await db.users.find_one({"_id": ObjectId(post["user_id"])}))["username"],
                    level=user["level"],
                )
            ))
        next_cursor = str(
            post_list[-1]._id) if len(post_list) == limit else None
        return schema.PostResponse(
            success=True,
            message="Posts retrieved successfully",
            posts=post_list,
            next_cursor=next_cursor
        )
    except Exception as e:
        return schema.PostResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def get_comments_for_post(info, limit, post_id, next_cursor):
    _, db = get_context_info(info)
    try:
        query = {}
        if next_cursor:
            query["_id"] = {"$lt": ObjectId(next_cursor)}

        query["post_id"] = ObjectId(post_id)

        # we will implement custom logic here later to fetch appropriate comments for user

        comments = db.post_comments.find(query).sort("_id", -1).limit(limit)
        comments = await comments.to_list(length=limit)

        if not comments:
            return schema.PostCommentResponse(
                success=True,
                message="No comments found"
            )

        comment_list = []
        for comment in comments:
            user = await db.user_profiles.find_one({"user_id": ObjectId(comment["user_id"])})
            comment_list.append(schema.PostComment(
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

        next_cursor = str(
            comment_list[-1]._id) if len(comment_list) == limit else None

        return schema.PostCommentResponse(
            success=True,
            message="Comments retrieved successfully",
            comments=comment_list,
            next_cursor=next_cursor
        )
    except Exception as e:
        return schema.PostCommentResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def get_likes_count_for_post(info, post_id):
    _, db = get_context_info(info)
    try:
        post = await db.posts.find_one({"_id": ObjectId(post_id)})
        if not post:
            return schema.LikeOrCommentCountResponse(
                success=True,
                message="Post not found"
            )
        return schema.LikeOrCommentCountResponse(
            success=True,
            message="Likes count retrieved successfully",
            count=schema.LikeOrCommentCount(count=post["likes_count"])
        )
    except Exception as e:
        return schema.LikeOrCommentCountResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def get_comments_count_for_post(info, post_id):
    _, db = get_context_info(info)
    try:
        post = await db.posts.find_one({"_id": ObjectId(post_id)})
        if not post:
            return schema.LikeOrCommentCountResponse(
                success=True,
                message="Post not found"
            )
        return schema.LikeOrCommentCountResponse(
            success=True,
            message="Comments count retrieved successfully",
            count=schema.LikeOrCommentCount(count=post["comments_count"])
        )
    except Exception as e:
        return schema.LikeOrCommentCountResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def create_post(info, unique_mongodb_id, content, tags):
    user_id, db = get_context_info(info)
    try:
        result = await db.posts.update_one(
            {"_id": ObjectId(unique_mongodb_id)},
            {"$set": {
                "content": content,
                "tags": tags,
                "likes_count": 0,
                "comments_count": 0,
            }},
        )
        if result.modified_count == 1:
            post = await db.posts.find_one({"_id": ObjectId(unique_mongodb_id)})
            # send message to kafka
            await send_message("post", str(user_id), {"post_id": str(post["_id"]), "type": "create"})
            post = schema.CreatePost(
                _id=post["_id"],
                created_at=post["created_at"]
            )
            return schema.CreatePostResponse(
                success=True,
                message="Post created successfully",
                post=post
            )
        else:
            return schema.CreatePostResponse(
                success=False,
                message="Failed to create the post"
            )
    except Exception as e:
        return schema.CreatePostResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def comment_on_post(info, post_id, comment_text):
    user_id, db = get_context_info(info)
    try:
        result = await db.post_comments.insert_one({
            "post_id": ObjectId(post_id),
            "user_id": ObjectId(user_id),
            "comment_text": comment_text,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(tz=timezone.utc)
        })
        if result.inserted_id:
            post = await db.posts.find_one({"_id": ObjectId(post_id)})
            await db.posts.update_one(
                {"_id": ObjectId(post_id)},
                {"$set": {"comments_count": post["comments_count"] + 1}}
            )
            comment = await db.post_comments.find_one({"_id": result.inserted_id})
            # send message to kafka
            await send_message("post", str(user_id), {"post_id": str(post["_id"]), "comment_id": str(comment["_id"]), "type": "create"})
            comment = schema.CommentOnPost(
                _id=comment["_id"],
                comment_text=comment["comment_text"],
                created_at=comment["created_at"],
                updated_at=comment["updated_at"]
            )
            return schema.CommentOnPostResponse(
                success=True,
                message="Comment created successfully",
                comment=comment
            )
        else:
            return schema.CommentOnPostResponse(
                success=False,
                message="Failed to create the comment"
            )
    except Exception as e:
        return schema.CommentOnPostResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def update_comment_on_post(info, post_comment_id, new_comment_text):
    user_id, db = get_context_info(info)
    try:
        result = await db.post_comments.update_one(
            {"_id": ObjectId(post_comment_id), "user_id": ObjectId(user_id)},
            {"$set": {
                "comment_text": new_comment_text,
                "updated_at": datetime.now(tz=timezone.utc)
            }}
        )
        if result.modified_count == 1:
            comment = await db.post_comments.find_one(
                {"_id": ObjectId(post_comment_id),
                 "user_id": ObjectId(user_id)}
            )
            # send message to kafka
            await send_message("post", str(user_id), {"post_id": str(comment["post_id"]), "comment_id": str(comment["_id"]), "type": "update"})
            comment = schema.CommentOnPost(
                _id=comment["_id"],
                comment_text=comment["comment_text"],
                created_at=comment["created_at"],
                updated_at=comment["updated_at"]
            )
            return schema.CommentOnPostResponse(
                success=True,
                message="Comment updated successfully",
                comment=comment
            )
        else:
            return schema.CommentOnPostResponse(
                success=False,
                message="Failed to update the comment"
            )
    except Exception as e:
        return schema.CommentOnPostResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def like_or_unlike_post(info, post_id):
    user_id, db = get_context_info(info)
    try:
        existing_like = await db.post_likes.find_one({
            "post_id": ObjectId(post_id),
            "user_id": ObjectId(user_id)
        })

        if existing_like:
            # User already liked the post, so remove the like
            await db.post_likes.delete_one({"_id": existing_like["_id"]})
            await db.posts.update_one(
                {"_id": ObjectId(post_id)},
                {"$inc": {"likes_count": -1}}
            )
            return schema.LikePostResponse(
                success=True,
                message="Post unliked successfully"
            )
        else:
            # User has not liked the post, so add the like
            result = await db.post_likes.insert_one({
                "post_id": ObjectId(post_id),
                "user_id": ObjectId(user_id),
                "created_at": datetime.now(tz=timezone.utc)
            })
            if result.inserted_id:
                await db.posts.update_one(
                    {"_id": ObjectId(post_id)},
                    {"$inc": {"likes_count": 1}}
                )
                # send message to kafka
                like = schema.LikePost(_id=result.inserted_id)
                await send_message("post", str(user_id), {"post_id": str(post["_id"]), "like_id": str(like["_id"]), "type": "create"})
                return schema.LikePostResponse(
                    success=True,
                    message="Post liked successfully",
                    like=like
                )
    except Exception as e:
        return schema.LikePostResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def follow_or_unfollow_another_user(info, post_id):
    user_id, db = get_context_info(info)
    try:
        # first find the user_id of the user of the post
        post = await db.posts.find_one({"_id": ObjectId(post_id)})
        user_id_of_the_user_of_the_post = post["user_id"]

        # check if the user is already following the user of the post
        existing_follow = await db.user_relationships.find_one({
            "user_id": ObjectId(user_id),
            "target_id": ObjectId(user_id_of_the_user_of_the_post)
        })
        if existing_follow:
            # User already follows the user of the post, so unfollow
            await db.user_relationships.delete_one({"_id": existing_follow["_id"]})
            # send message to kafka
            await send_message("connection", str(user_id), {"target_id": str(user_id_of_the_user_of_the_post), "type": "unfollow"})
            return schema.FollowOrUnFollowUserResponse(
                success=True,
                message="User unfollowed successfully",
            )
        else:
            # User does not follow the user of the post, so follow
            result = await db.user_relationships.insert_one({
                "user_id": ObjectId(user_id),
                "target_id": ObjectId(user_id_of_the_user_of_the_post),
                "created_at": datetime.now(tz=timezone.utc)
            })
            if result.inserted_id:
                # send message to kafka
                await send_message("connection", str(user_id), {"target_id": str(user_id_of_the_user_of_the_post), "type": "follow"})
                return schema.FollowOrUnFollowUserResponse(
                    success=True,
                    message="User followed successfully",
                    following=schema.FollowOrUnFollow(
                        _id=result.inserted_id,
                        target_id=user_id_of_the_user_of_the_post
                    )
                )
            # This block handles the rare case where inserted_id is None or invalid
            else:
                return schema.FollowOrUnFollowUserResponse(
                    success=False,
                    message="Failed to follow the user"
                )
    except Exception as e:
        return schema.FollowOrUnFollowUserResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def bookmark_post(info, post_id):
    user_id, db = get_context_info(info)
    try:
        existing_bookmark = await db.user_activities.find_one({
            "user_id": ObjectId(user_id),
            "posts_saved": {"$in": [ObjectId(post_id)]}
        })

        if existing_bookmark:
            # User already bookmarked the post, so remove the bookmark
            await db.user_activities.update_one(
                {"user_id": ObjectId(user_id)},
                {"$pull": {"posts_saved": ObjectId(post_id)}}
            )
            return schema.BookmarkPostResponse(
                success=True,
                message="Post unbookmarked successfully",
                bookmark=schema.BookmarkPost(is_bookmarked=False)
            )
        else:
            # User has not bookmarked the post, so add the bookmark
            result = await db.user_activities.update_one(
                {"user_id": ObjectId(user_id)},
                {"$addToSet": {"posts_saved": ObjectId(post_id)}}
            )
            if result.modified_count == 1:
                return schema.BookmarkPostResponse(
                    success=True,
                    message="Post bookmarked successfully",
                    bookmark=schema.BookmarkPost(is_bookmarked=True)
                )
            # This block handles the rare case where inserted_id is None or invalid
            else:
                return schema.BookmarkPostResponse(
                    success=False,
                    message="Failed to bookmark the post"
                )
    except Exception as e:
        return schema.BookmarkPostResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )
