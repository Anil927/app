import strawberry

from app.schemas.user_profile import UserProfileQuery, UserProfileMutation
from app.schemas.post import PostQuery, PostMutation
from app.schemas.code_file import CodeFileQuery, CodeFileMutation



@strawberry.type
class Query(UserProfileQuery, PostQuery, CodeFileQuery):
    pass


@strawberry.type
class Mutation(UserProfileMutation, PostMutation, CodeFileMutation):
    pass

schema = strawberry.Schema(query=Query, mutation=Mutation)
