from datetime import datetime
import strawberry

from app.resolvers import post
from app.schemas.user_profile import User



@strawberry.type
class CreatePost:
    _id: str
    created_at: datetime

@strawberry.type
class CreatePostResponse:
    success: bool
    message: str
    post: CreatePost | None = None


@strawberry.type
class Post:
    _id: str
    content: str
    image_url: str
    likes_count: int
    comments_count: int
    created_at: datetime
    user: User

@strawberry.type
class PostResponse:
    success: bool
    message: str
    posts: list[Post] | None = None
    next_cursor: str | None = None


@strawberry.type
class CommentOnPost:
    _id: str
    comment_text: str
    created_at: datetime
    updated_at: datetime

@strawberry.type
class CommentOnPostResponse:
    success: bool
    message: str
    comment: CommentOnPost | None = None


@strawberry.type
class PostComment:
    _id: str
    comment_text: str
    created_at: datetime
    updated_at: datetime
    user: User

@strawberry.type
class PostCommentResponse:
    success: bool
    message: str
    comments: list[PostComment] | None = None
    next_cursor: str | None = None


@strawberry.type
class LikeOrCommentCount:
    count: int

@strawberry.type
class LikeOrCommentCountResponse:
    success: bool
    message: str
    count: LikeOrCommentCount | None = None


@strawberry.type
class LikePost:
    _id: str

@strawberry.type
class LikePostResponse:
    success: bool
    message: str
    like: LikePost | None = None


@strawberry.type
class FollowOrUnFollow:
    _id: str
    target_id: str

@strawberry.type
class FollowOrUnFollowUserResponse:
    success: bool
    message: str
    following: FollowOrUnFollow | None = None



# Post query
@strawberry.type
class PostQuery:
    @strawberry.field
    async def get_posts(self, info, limit: int, next_cursor: str | None=None, post_ids: list[str] | None=None) -> PostResponse:
        return await post.get_posts(info, limit, next_cursor, post_ids)

    @strawberry.field
    async def get_comments(self, info, limit: int, post_id: str, next_cursor: str | None=None) -> PostCommentResponse:
        return await post.get_comments(info, limit, post_id, next_cursor)

    @strawberry.field
    async def get_likes_count(self, info, post_id: str) -> LikeOrCommentCountResponse:
        return await post.get_likes_count(info, post_id)

    @strawberry.field
    async def get_comments_count(self, info, post_id: str) -> LikeOrCommentCountResponse:
        return await post.get_comments_count(info, post_id)



# Post mutation
@strawberry.type
class PostMutation:
    @strawberry.mutation
    async def create_post(self, info, unique_mongodb_id: str, content: str, tags: list[str]) -> CreatePostResponse:
        return await post.create_post(info, unique_mongodb_id, content, tags)

    @strawberry.mutation
    async def comment_on_post(self, info, post_id: str, comment_text: str) -> CommentOnPostResponse:
        return await post.comment_on_post(info, post_id, comment_text)

    @strawberry.mutation
    async def update_comment_on_post(self, info, post_id: str, new_comment_text: str) -> CommentOnPostResponse:
        return await post.update_comment_on_post(info, post_id, new_comment_text)

    @strawberry.mutation
    async def like_or_unlike_post(self, info, post_id: str) -> LikePostResponse:
        return await post.like_or_unlike_post(info, post_id)

    @strawberry.mutation
    async def follow_or_unfollow_another_user(self, info, post_id: str) -> FollowOrUnFollowUserResponse:
        return await post.follow_or_unfollow_another_user(info, post_id)
