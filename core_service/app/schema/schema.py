import strawberry

from app.schema.user_profile import UserProfileQuery, UserProfileMutation


@strawberry.type
class Query(UserProfileQuery):
    pass


@strawberry.type
class Mutation(UserProfileMutation):
    pass

schema = strawberry.Schema(query=Query, mutation=Mutation)
