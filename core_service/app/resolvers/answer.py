# Answer type
@strawberry.type
class Answer:
    _id: ObjectIdStr
    question_id: ObjectIdStr
    user_id: ObjectIdStr
    answer_text: str
    upvotes: List[ObjectIdStr]
    downvotes: List[ObjectIdStr]
    votes_count: int
    created_at: datetime
    updated_at: datetime
