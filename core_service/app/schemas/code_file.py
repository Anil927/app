import strawberry
from datetime import datetime

from app.resolvers import code_file
from app.schemas.user_profile import User



@strawberry.type
class CodeFile:
    _id: str
    code_title: str
    file_type: str
    file_urls: list[str]
    views: int
    comments_count: int
    upload_date: datetime
    user: User

@strawberry.type
class CodeFileResponse:
    success: bool
    message: str
    code_file: list[CodeFile] | None = None
    next_cursor: str | None = None


@strawberry.type
class CodeFileComment:
    _id: str
    comment_text: str
    created_at: datetime
    updated_at: datetime
    user: User

@strawberry.type
class CodeFileCommentResponse:
    success: bool
    message: str
    comments: list[CodeFileComment] | None = None
    next_cursor: str | None = None


@strawberry.type
class CodeFileViewsCount:
    views: int

@strawberry.type
class CodeFileViewsCountResponse:
    success: bool
    message: str
    count: CodeFileViewsCount | None = None


@strawberry.type
class IncreaseCodeFileViewsCount:
    views: int

@strawberry.type
class IncreaseCodeFileViewsCountResponse:
    success: bool
    message: str
    count: IncreaseCodeFileViewsCount | None = None


@strawberry.type
class CodeFileCommentCount:
    count: int

@strawberry.type
class CodeFileCommentCountResponse:
    success: bool
    message: str
    count: CodeFileCommentCount | None = None


@strawberry.type
class CommentOnCodeFile:
    _id: str
    comment_text: str
    created_at: datetime
    updated_at: datetime

@strawberry.type
class CommentOnCodeFileResponse:
    success: bool
    message: str
    comment: CommentOnCodeFile | None = None
    

# Post query
@strawberry.type
class CodeFileQuery:
    @strawberry.field
    async def get_code_files(self, info, limit: int, next_cursor: str | None=None, code_file_ids: list[str] | None=None) -> CodeFileResponse:
        return await code_file.get_code_files(info, limit, next_cursor, code_file_ids)
        
    @strawberry.field
    async def get_comments_for_code_files(self, info, limit: int, code_file_id: str, next_cursor: str | None=None) -> CodeFileCommentResponse:
        return await code_file.get_comments_for_code_files(info, limit, code_file_id, next_cursor)

    @strawberry.field
    async def get_views_count_for_code_files(self, info, code_file_id: str) -> CodeFileViewsCountResponse:
        return await code_file.get_views_count_for_code_files(info, code_file_id)

    @strawberry.field
    async def get_comments_count_for_code_files(self, info, code_file_id: str) -> CodeFileCommentCountResponse:
        return await code_file.get_comments_count_for_code_files(info, code_file_id)

    

# Post mutation
@strawberry.type
class CodeFileMutation:
    @strawberry.mutation
    async def comment_on_code_file(self, info, code_file_id: str, comment_text: str) -> CommentOnCodeFileResponse:
        return await code_file.comment_on_code_file(info, code_file_id, comment_text)

    @strawberry.mutation
    async def update_comment_on_code_file(self, info, _id: str, new_comment_text: str) -> CommentOnCodeFileResponse:
        return await code_file.update_comment_on_code_file(info, _id, new_comment_text)

    @strawberry.mutation
    async def increase_code_file_views_count(self, info, code_file_id: str) -> IncreaseCodeFileViewsCountResponse:
        return await code_file.increase_code_file_views_count(info, code_file_id)