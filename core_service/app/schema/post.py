from datetime import datetime
import strawberry
from utils.scalars import ObjectIdStr

from app.services import post

# Post type
@strawberry.type
class Post:
    content: str
    image_url: str | None = None
    likes_count: int
    comments_count: int
    upload_date: datetime

# Posts Comment
@strawberry.type
class PostComment:
    # post_id: ObjectIdStr
    comment_text: str
    created_at: datetime
    updated_at: datetime

# @strawberry.type
# class Post

@strawberry.type
class Posts:
    multiple_posts: list[Post]

# Post query
@strawberry.type
class PostQuery:
    pass

