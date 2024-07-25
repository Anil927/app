from bson import ObjectId
from datetime import datetime, timezone

import app.schemas.question_answer as schema
from app.utils.helper_fun import get_context_info
from app.kafka.send_message import send_message


async def get_question_titles(info, limit, next_cursor):
    user_id, db = get_context_info(info)
    try:
        questions = None

        query = {}
        if next_cursor:
            query["_id"] = {"$lt": ObjectId(next_cursor)}

        # we will implement custom logic here later to fetch appropriate feed questions for user

        questions = db.questions.find(query).sort("_id", -1).limit(limit)
        questions = await questions.to_list(length=limit)

        if not questions:
            return schema.QuestionTitleResponse(
                success=True,
                message="No questions found"
            )

        question_list = []
        for question in questions:
            question_list.append(schema.QuestionTitle(
                _id=question["_id"],
                question_title=question["question_title"],
                answer_count=question["answer_count"],
                created_at=question["created_at"],
                username=(await db.users.find_one({"_id": ObjectId(question["user_id"])}))["username"],
            ))

        next_cursor = str(
            question_list[-1]._id) if len(question_list) == limit else None

        return schema.QuestionTitleResponse(
            success=True,
            message="QuestionTitles retrieved successfully",
            question_title=question_list,
            next_cursor=next_cursor
        )
    except Exception as e:
        return schema.QuestionTitleResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def get_detail_question(info, question_ids):
    user_id, db = get_context_info(info)
    try:
        questions = db.questions.find(
            {"_id": {"$in": [ObjectId(q_id) for q_id in question_ids]}})
        questions = await questions.to_list(length=len(question_ids))

        if not questions:
            return schema.DetailQuestionResponse(
                success=True,
                message="No questions found"
            )

        question_list = []
        for question in questions:
            user = await db.user_profiles.find_one({"user_id": ObjectId(question["user_id"])})
            question_list.append(schema.DetailQuestion(
                question_title=schema.QuestionTitle(
                    _id=question["_id"],
                    question_title=question["question_title"],
                    answer_count=question["answer_count"],
                    created_at=question["created_at"],
                ),
                question_text=question["question_text"],
                views_count=question["views_count"],
                updated_at=question["updated_at"],
                upvote_count=len(question["upvotes"]),
                downvote_count=len(question["downvotes"]),
                user=schema.User(
                    profile_pic=user["profile_pic"],
                    username=(await db.users.find_one({"_id": ObjectId(question["user_id"])}))["username"],
                    level=user["level"],
                )
            ))

        return schema.DetailQuestionResponse(
            success=True,
            message="Detail questions retrieved successfully",
            detail_question=question_list
        )
    except Exception as e:
        return schema.DetailQuestionResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def get_detail_answer(info, answer_ids):
    user_id, db = get_context_info(info)
    try:
        answers = db.answers.find(
            {"_id": {"$in": [ObjectId(a_id) for a_id in answer_ids]}})
        answers = await answers.to_list(length=len(answer_ids))

        if not answers:
            return schema.DetailAnswerResponse(
                success=True,
                message="No answers found"
            )

        answer_list = []
        for answer in answers:
            user = await db.user_profiles.find_one({"user_id": ObjectId(answer["user_id"])})
            answer_list.append(schema.DetailAnswer(
                _id=answer["_id"],
                question_id=answer["question_id"],
                answer_text=answer["answer_text"],
                upvote_count=len(answer["upvotes"]),
                downvote_count=len(answer["downvotes"]),
                created_at=answer["created_at"],
                updated_at=answer["updated_at"],
                user=schema.User(
                    profile_pic=user["profile_pic"],
                    username=(await db.users.find_one({"_id": ObjectId(answer["user_id"])}))["username"],
                    level=user["level"],
                )
            ))
        return schema.DetailAnswerResponse(
            success=True,
            message="Detail answers retrieved successfully",
            detail_answer=answer_list
        )
    except Exception as e:
        return schema.DetailAnswerResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def get_question_answer(info, question_id):
    user_id, db = get_context_info(info)
    try:
        question = await db.questions.find_one({"_id": ObjectId(question_id)})
        if not question:
            return schema.QuestionAnswerResponse(
                success=False,
                message="Question not found"
            )

        user = await db.user_profiles.find_one({"user_id": ObjectId(question["user_id"])})
        is_bookmarked = await db.user_activities.find_one({
            "user_id": ObjectId(user_id),
            "questions_saved": {"$in": [ObjectId(question["_id"])]}
        })
        question_detail = schema.DetailQuestion(
            question_title=schema.QuestionTitle(
                _id=question["_id"],
                question_title=question["question_title"],
                answer_count=question["answer_count"],
                created_at=question["created_at"],
            ),
            question_text=question["question_text"],
            views_count=question["views_count"],
            updated_at=question["updated_at"],
            upvote_count=len(question["upvotes"]),
            downvote_count=len(question["downvotes"]),
            is_bookmarked=bool(is_bookmarked),
            user=schema.User(
                profile_pic=user["profile_pic"],
                username=(await db.users.find_one({"_id": ObjectId(question["user_id"])}))["username"],
                level=user["level"],
            )
        )

        answers = db.answers.find({"question_id": question_id})
        answers = await answers.to_list(length=100)

        answer_list = []
        for answer in answers:
            is_bookmarked = await db.user_activities.find_one({
                "user_id": ObjectId(user_id),
                "answers_saved": {"$in": [ObjectId(answer["_id"])]}
            })
            user = await db.user_profiles.find_one({"user_id": ObjectId(answer["user_id"])})
            answer_list.append(schema.DetailAnswer(
                _id=answer["_id"],
                question_id=question_id,
                answer_text=answer["answer_text"],
                upvote_count=len(answer["upvotes"]),
                downvote_count=len(answer["downvotes"]),
                is_bookmarked=bool(is_bookmarked),
                created_at=answer["created_at"],
                updated_at=answer["updated_at"],
                user=schema.User(
                    profile_pic=user["profile_pic"],
                    username=(await db.users.find_one({"_id": ObjectId(answer["user_id"])}))["username"],
                    level=user["level"],
                )
            ))

        return schema.QuestionAnswerResponse(
            success=True,
            message="Question and answers retrieved successfully",
            question=question_detail,
            answer=answer_list
        )
    except Exception as e:
        return schema.QuestionAnswerResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def ask_question(info, question_title, question_text, question_tags, question_id):
    user_id, db = get_context_info(info)
    try:
        # check if question_id is not None, if not None means user is trying to update the question
        if question_id:
            question = await db.questions.find_one({"_id": ObjectId(question_id)})
            if not question:
                return schema.AskQuestionResponse(
                    success=False,
                    message="Question not found"
                )
            # update the question
            result = await db.questions.update_one(
                {"_id": ObjectId(question_id)},
                {
                    "$set": {
                        "question_title": question_title,
                        "question_text": question_text,
                        "updated_at": datetime.now(timezone.utc)
                    }
                }
            )
            if result.modified_count == 1:
                # send message to kafka
                await send_message("qna", str(user_id), {"question_id": str(question_id), "type": "update-question"})
                return schema.AskQuestionResponse(
                    success=True,
                    message="Question updated successfully",
                    question=schema.AskQuestion(
                        _id=question_id,
                        question_title=question_title,
                        updated_at=question["updated_at"]
                    )
                )
            else:
                return schema.AskQuestionResponse(
                    success=False,
                    message="Failed to update question"
                )
        # check if the question_title already exist in db
        existing_question = await db.questions.find_one({"question_title": question_title})
        if existing_question:
            return schema.AskQuestionResponse(
                success=False,
                message="Question with this title already exists"
            )
        question = {
            "question_title": question_title,
            "question_text": question_text,
            "question_tags": question_tags,
            "user_id": ObjectId(user_id),
            "answer_count": 0,
            "views_count": 0,
            "upvotes": [],
            "downvotes": [],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
        # Check if the insertion was successful
        result = await db.questions.insert_one(question)
        if result.inserted_id:
            # send message to kafka
            await send_message("qna", str(user_id), {"question_id": str(result.inserted_id), "type": "new-question"})
            return schema.AskQuestionResponse(
                success=True,
                message="Question posted successfully",
                question=schema.AskQuestion(
                    _id=str(result.inserted_id),
                    question_title=question["question_title"],
                    created_at=question["created_at"]
                )
            )
        # This block handles the rare case where inserted_id is None or invalid
        else:
            return schema.AskQuestionResponse(
                success=False,
                message="Failed to post question"
            )
    except Exception as e:
        return schema.AskQuestionResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def give_answer(info, question_id, answer_text, answer_id):
    user_id, db = get_context_info(info)
    try:
        # check if answer_id is not None, if not None means user is trying to update the answer
        if answer_id:
            answer = await db.answers.find_one({"_id": ObjectId(answer_id)})
            if not answer:
                return schema.GiveAnswerResponse(
                    success=False,
                    message="Answer not found"
                )
            # update the answer
            result = await db.answers.update_one(
                {"_id": ObjectId(answer_id)},
                {
                    "$set": {
                        "answer_text": answer_text,
                        "updated_at": datetime.now(timezone.utc)
                    }
                }
            )
            if result.modified_count == 1:
                # send message to kafka
                await send_message("qna", str(user_id), {"answer_id": str(answer_id), "type": "update-answer"})
                return schema.GiveAnswerResponse(
                    success=True,
                    message="Answer updated successfully",
                    answer=schema.GiveAnswer(
                        _id=answer_id,
                        updated_at=answer["updated_at"]
                    )
                )
            else:
                return schema.GiveAnswerResponse(
                    success=False,
                    message="Failed to update answer"
                )
        question = await db.questions.find_one({"_id": ObjectId(question_id)})
        if not question:
            return schema.GiveAnswerResponse(
                success=False,
                message="Question not found"
            )
        answer = {
            "question_id": ObjectId(question_id),
            "answer_text": answer_text,
            "user_id": ObjectId(user_id),
            "upvotes": [],
            "downvotes": [],
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
        # Check if the insertion was successful
        result = await db.answers.insert_one(answer)
        if result.inserted_id:
            # Increment the answer_count in the question document
            await db.questions.update_one({"_id": ObjectId(question_id)}, {"$inc": {"answer_count": 1}})
            # send message to kafka
            await send_message("qna", str(user_id), {"answer_id": str(result.inserted_id), "type": "create-answer"})
            return schema.GiveAnswerResponse(
                success=True,
                message="Answer posted successfully",
                answer=schema.GiveAnswer(
                    _id=str(result.inserted_id),
                    created_at=answer["created_at"]
                )
            )
        # This block handles the rare case where inserted_id is None or invalid
        else:
            return schema.GiveAnswerResponse(
                success=False,
                message="Failed to post answer"
            )
    except Exception as e:
        return schema.GiveAnswerResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def toggle_upvote_question(info, question_id):
    user_id, db = get_context_info(info)
    try:
        question = await db.questions.find_one({"_id": ObjectId(question_id)})
        if not question:
            return schema.UpvoteDownvoteResponse(
                success=False,
                message="Question not found"
            )
        is_upvoted = False
        if ObjectId(user_id) in question["upvotes"]:
            await db.questions.update_one({"_id": ObjectId(question_id)}, {"$pull": {"upvotes": ObjectId(user_id)}})
        else:
            await db.questions.update_one({"_id": ObjectId(question_id)}, {"$addToSet": {"upvotes": ObjectId(user_id)}})
            # send message to kafka
            await send_question_vote_msg(user_id, question_id, question)
            is_upvoted = True
        return schema.UpvoteDownvoteResponse(
            success=True,
            message="Upvote toggled successfully",
            vote=schema.Upvote(is_upvoted=is_upvoted)
        )
    except Exception as e:
        return schema.UpvoteDownvoteResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def toggle_downvote_question(info, question_id):
    user_id, db = get_context_info(info)
    try:
        question = await db.questions.find_one({"_id": ObjectId(question_id)})
        if not question:
            return schema.UpvoteDownvoteResponse(
                success=False,
                message="Question not found"
            )
        is_downvoted = False
        if ObjectId(user_id) in question["downvotes"]:
            await db.questions.update_one({"_id": ObjectId(question_id)}, {"$pull": {"downvotes": ObjectId(user_id)}})
        else:
            await db.questions.update_one({"_id": ObjectId(question_id)}, {"$addToSet": {"downvotes": ObjectId(user_id)}})
            # send message to kafka
            await send_question_vote_msg(user_id, question_id, question)
            is_downvoted = True
        return schema.UpvoteDownvoteResponse(
            success=True,
            message="Downvote toggled successfully",
            vote=schema.Downvote(is_downvoted=is_downvoted)
        )
    except Exception as e:
        return schema.UpvoteDownvoteResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def toggle_upvote_answer(info, answer_id):
    user_id, db = get_context_info(info)
    try:
        answer = await db.answers.find_one({"_id": ObjectId(answer_id)})
        if not answer:
            return schema.UpvoteDownvoteResponse(
                success=False,
                message="Answer not found"
            )
        is_upvoted = False
        if ObjectId(user_id) in answer["upvotes"]:
            await db.answers.update_one({"_id": ObjectId(answer_id)}, {"$pull": {"upvotes": ObjectId(user_id)}})
        else:
            await db.answers.update_one({"_id": ObjectId(answer_id)}, {"$addToSet": {"upvotes": ObjectId(user_id)}})
            # send message to kafka
            await send_answer_vote_msg(user_id, answer_id, answer)
            is_upvoted = True
        return schema.UpvoteDownvoteResponse(
            success=True,
            message="Upvote toggled successfully",
            vote=schema.Upvote(is_upvoted=is_upvoted)
        )
    except Exception as e:
        return schema.UpvoteDownvoteResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def toggle_downvote_answer(info, answer_id):
    user_id, db = get_context_info(info)
    try:
        answer = await db.answers.find_one({"_id": ObjectId(answer_id)})
        if not answer:
            return schema.UpvoteDownvoteResponse(
                success=False,
                message="Answer not found"
            )
        is_downvoted = False
        if ObjectId(user_id) in answer["downvotes"]:
            await db.answers.update_one({"_id": ObjectId(answer_id)}, {"$pull": {"downvotes": ObjectId(user_id)}})
        else:
            await db.answers.update_one({"_id": ObjectId(answer_id)}, {"$addToSet": {"downvotes": ObjectId(user_id)}})
            # send message to kafka
            await send_answer_vote_msg(user_id, answer_id, answer)
            is_downvoted = True
        return schema.UpvoteDownvoteResponse(
            success=True,
            message="Downvote toggled successfully",
            vote=schema.Downvote(is_downvoted=is_downvoted)
        )
    except Exception as e:
        return schema.UpvoteDownvoteResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def toggle_bookmark_question(info, question_id):
    user_id, db = get_context_info(info)
    try:
        existing_bookmark = await db.user_activities.find_one({
            "user_id": ObjectId(user_id),
            "questions_saved": {"$in": [ObjectId(question_id)]}
        })

        if existing_bookmark:
            # User already bookmarked the question, so remove the bookmark
            await db.user_activities.update_one(
                {"user_id": ObjectId(user_id)},
                {"$pull": {"questions_saved": ObjectId(question_id)}}
            )
            return schema.BookmarkQuestionOrAnswerResponse(
                success=True,
                message="Question unbookmarked successfully",
                bookmark=schema.BookmarkQuestionOrAnswer(is_bookmarked=False)
            )
        else:
            # User has not bookmarked the question, so add the bookmark
            result = await db.user_activities.update_one(
                {"user_id": ObjectId(user_id)},
                {"$addToSet": {"questions_saved": ObjectId(question_id)}}
            )
            if result.modified_count == 1:
                return schema.BookmarkQuestionOrAnswerResponse(
                    success=True,
                    message="Question bookmarked successfully",
                    bookmark=schema.BookmarkQuestionOrAnswer(
                        is_bookmarked=True)
                )
            # This block handles the rare case where inserted_id is None or invalid
            else:
                return schema.BookmarkQuestionOrAnswerResponse(
                    success=False,
                    message="Failed to bookmark the question"
                )
    except Exception as e:
        return schema.BookmarkQuestionOrAnswerResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def toggle_bookmark_answer(info, answer_id):
    user_id, db = get_context_info(info)
    try:
        existing_bookmark = await db.user_activities.find_one({
            "user_id": ObjectId(user_id),
            "answers_saved": {"$in": [ObjectId(answer_id)]}
        })

        if existing_bookmark:
            # User already bookmarked the answer, so remove the bookmark
            await db.user_activities.update_one(
                {"user_id": ObjectId(user_id)},
                {"$pull": {"answers_saved": ObjectId(answer_id)}}
            )
            return schema.BookmarkQuestionOrAnswerResponse(
                success=True,
                message="Answer unbookmarked successfully",
                bookmark=schema.BookmarkQuestionOrAnswer(is_bookmarked=False)
            )
        else:
            # User has not bookmarked the answer, so add the bookmark
            result = await db.user_activities.update_one(
                {"user_id": ObjectId(user_id)},
                {"$addToSet": {"answers_saved": ObjectId(answer_id)}}
            )
            if result.modified_count == 1:
                return schema.BookmarkQuestionOrAnswerResponse(
                    success=True,
                    message="Answer bookmarked successfully",
                    bookmark=schema.BookmarkQuestionOrAnswer(
                        is_bookmarked=True)
                )
            # This block handles the rare case where inserted_id is None or invalid
            else:
                return schema.BookmarkQuestionOrAnswerResponse(
                    success=False,
                    message="Failed to bookmark the answer"
                )
    except Exception as e:
        return schema.BookmarkQuestionOrAnswerResponse(
            success=False,
            message=f"An error occurred: {str(e)}"
        )


async def send_question_vote_msg(user_id, question_id, question):
    if (question["upvotes"] - question["downvotes"]) > 5:
        await send_message("qna", str(user_id), {"question_id": str(question_id), "type": "upvote-question"})
    elif (question["upvotes"] - question["downvotes"]) < -3:
        await send_message("qna", str(user_id), {"question_id": str(question_id), "type": "downvote-question"})

async def send_answer_vote_msg(user_id, answer_id, answer):
    if (answer["upvotes"] - answer["downvotes"]) > 5:
        await send_message("qna", str(user_id), {"answer_id": str(answer_id), "type": "upvote-answer"})
    elif (answer["upvotes"] - answer["downvotes"]) < -3:
        await send_message("qna", str(user_id), {"answer_id": str(answer_id), "type": "downvote-answer"})

