import strawberry

from app.schemas.user_profile import UserProfileQuery, UserProfileMutation
from app.schemas.post import PostQuery, PostMutation
from app.schemas.code_file import CodeFileQuery, CodeFileMutation
from app.schemas.question_answer import QuestionAnswerQuery, QuestionAnswerMutation



@strawberry.type
class Query(UserProfileQuery, PostQuery, CodeFileQuery, QuestionAnswerQuery):
    pass


@strawberry.type
class Mutation(UserProfileMutation, PostMutation, CodeFileMutation, QuestionAnswerMutation):
    pass

schema = strawberry.Schema(query=Query, mutation=Mutation)
