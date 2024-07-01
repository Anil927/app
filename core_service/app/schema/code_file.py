# CodeFile type
@strawberry.type
class CodeFile:
    _id: ObjectIdStr
    user_id: ObjectIdStr
    code_title: str
    file_type: str
    upload_date: datetime
    views: int
    file_urls: List[str]
    comments_count: int
