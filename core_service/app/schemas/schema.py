import strawberry

from app.schemas.user_profile import UserProfileQuery, UserProfileMutation
from app.schemas.post import PostQuery, PostMutation


@strawberry.type
class Query(UserProfileQuery, PostQuery):
    pass


@strawberry.type
class Mutation(UserProfileMutation, PostMutation):
    pass

schema = strawberry.Schema(query=Query, mutation=Mutation)
