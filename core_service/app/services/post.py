# Post type
@strawberry.type
class Post:
    _id: ObjectIdStr
    user_id: ObjectIdStr
    content: str
    image_url: str
    post_type: str
    upload_date: datetime
    likes_count: int
    comments_count: int