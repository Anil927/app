from datetime import datetime
import strawberry

from app.resolvers import question_answer
from app.schemas.user_profile import User



@strawberry.type
class QuestionTitle:
    _id: str
    question_title: str
    answer_count: int
    username: str | None = None
    created_at: datetime


@strawberry.type
class QuestionTitleResponse:
    success: bool
    message: str
    question_title: list[QuestionTitle] | None = None
    next_cursor: str | None = None


@strawberry.type
class DetailQuestion:
    question_title: QuestionTitle
    question_text: str
    views_count: int
    updated_at: datetime
    upvote_count: int
    downvote_count: int
    is_bookmarked: bool | None = None
    user: User

@strawberry.type
class DetailQuestionResponse:
    success: bool
    message: str
    detail_question: list[DetailQuestion] | None = None
    next_cursor: str | None = None


@strawberry.type
class DetailAnswer:
    _id: str
    question_id: str | None = None
    answer_text: str
    upvote_count: int
    downvote_count: int
    is_bookmarked: bool | None = None
    created_at: datetime
    updated_at: datetime
    user: User

@strawberry.type
class DetailAnswerResponse:
    success: bool
    message: str
    detail_answer: list[DetailAnswer] | None = None
    next_cursor: str | None = None


@strawberry.type
class QuestionAnswerResponse:
    success: bool
    message: str
    question: DetailQuestion | None = None
    answer: list[DetailAnswer] | None = None


@strawberry.type
class AskQuestion:
    _id: str
    question_title: str
    created_at: datetime | None = None
    updated_at: datetime | None = None

@strawberry.type
class AskQuestionResponse:
    success: bool
    message: str
    question: AskQuestion | None = None


@strawberry.type
class GiveAnswer:
    _id: str
    created_at: datetime | None = None
    updated_at: datetime | None = None

@strawberry.type
class GiveAnswerResponse:
    success: bool
    message: str
    answer: GiveAnswer | None = None


@strawberry.type
class Upvote:
    is_upvoted: bool

@strawberry.type
class Downvote:
    is_downvoted: bool

@strawberry.type
class UpvoteDownvoteResponse:
    success: bool
    message: str
    vote: Upvote | Downvote | None = None


@strawberry.type
class BookmarkQuestionOrAnswer:
    is_bookmarked: bool

@strawberry.type
class BookmarkQuestionOrAnswerResponse:
    success: bool
    message: str
    bookmark: BookmarkQuestionOrAnswer | None = None



@strawberry.type
class QuestionAnswerQuery:
    @strawberry.field
    async def get_question_titles(self, info, limit: int, next_cursor: str | None=None) -> QuestionTitleResponse:
        return await question_answer.get_question_titles(info, limit, next_cursor)

    @strawberry.field
    async def get_detail_question(self, info, question_ids: list[str]) -> DetailQuestionResponse:
        return await question_answer.get_detail_question(info, question_ids)

    @strawberry.field
    async def get_detail_answer(self, info, answer_ids: list[str]) -> DetailAnswerResponse:
        return await question_answer.get_detail_answer(info, answer_ids)

    @strawberry.field
    async def get_question_answer(self, info, question_id: str) -> QuestionAnswerResponse:
        return await question_answer.get_question_answer(info, question_id)


@strawberry.type
class QuestionAnswerMutation:
    @strawberry.mutation
    async def ask_question(self, info, question_title: str, question_text: str, question_tags: list[str], question_id: str | None=None) -> AskQuestionResponse:
        return await question_answer.ask_question(info, question_title, question_text, question_tags, question_id)

    @strawberry.mutation
    async def give_answer(self, info, question_id: str, answer_text: str, answer_id: str | None=None) -> GiveAnswerResponse:
        return await question_answer.give_answer(info, question_id, answer_text, answer_id)

    @strawberry.mutation
    async def toggle_upvote_question(self, info, question_id: str) -> UpvoteDownvoteResponse:
        return await question_answer.toggle_upvote_question(info, question_id)

    @strawberry.mutation
    async def toggle_downvote_question(self, info, question_id: str) -> UpvoteDownvoteResponse:
        return await question_answer.toggle_downvote_question(info, question_id)

    @strawberry.mutation
    async def toggle_upvote_answer(self, info, answer_id: str) -> UpvoteDownvoteResponse:
        return await question_answer.toggle_upvote_answer(info, answer_id)

    @strawberry.mutation
    async def toggle_downvote_answer(self, info, answer_id: str) -> UpvoteDownvoteResponse:
        return await question_answer.toggle_downvote_answer(info, answer_id)

    @strawberry.mutation
    async def toggle_bookmark_question(self, info, question_id: str) -> BookmarkQuestionOrAnswerResponse:
        return await question_answer.toggle_bookmark_question(info, question_id)

    @strawberry.mutation
    async def toggle_bookmark_answer(self, info, answer_id: str) -> BookmarkQuestionOrAnswerResponse:
        return await question_answer.toggle_bookmark_answer(info, answer_id)

    

