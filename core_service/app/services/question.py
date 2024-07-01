# Question type
@strawberry.type
class Question:
    _id: ObjectIdStr
    user_id: ObjectIdStr
    question_title: str
    question_text: str
    views_count: int
    upvotes: List[ObjectIdStr]
    downvotes: List[ObjectIdStr]
    votes_count: int
    created_at: datetime
    updated_at: datetime
