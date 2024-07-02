import strawberry


# UserActivity type
@strawberry.type
class UserActivity:
    _id: ObjectIdStr
    user_id: ObjectIdStr
    codes_uploaded: List[ObjectIdStr]
    posts_posted: List[ObjectIdStr]
    questions_asked: List[ObjectIdStr]
    answers_given: List[ObjectIdStr]
    codes_saved: List[ObjectIdStr]
    posts_saved: List[ObjectIdStr]
    questions_saved: List[ObjectIdStr]
    answers_saved: List[ObjectIdStr]
    engagement_streak: List[datetime]