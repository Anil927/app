# CodeFileComment type
@strawberry.type
class CodeFileComment:
    _id: ObjectIdStr
    code_file_id: ObjectIdStr
    user_id: ObjectIdStr
    comment_text: str
    created_at: datetime
    updated_at: datetime
