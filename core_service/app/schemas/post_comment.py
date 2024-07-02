# PostComment type
@strawberry.type
class PostComment:
    _id: ObjectIdStr
    post_id: ObjectIdStr
    # user_id: ObjectIdStr
    comment_text: str
    created_at: datetime
    updated_at: datetime
