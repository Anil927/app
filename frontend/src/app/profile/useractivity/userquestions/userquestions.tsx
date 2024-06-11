import React from 'react'
import QuestionFormat from '@/app/components/qnaformat/qnaformat'
import './userquestion.css'

const UserQuestions = () => {

    const userQuestionIds = [1, 2, 3, 4, 5] // dummy data, need to fetch from backend

    return (
        userQuestionIds.map((id) => {
            return (
                <Questions key={id} id={id} />
            )
        })
    )
}

export default UserQuestions




interface QuestionsProps {
    id: number;
}

const Questions: React.FC<QuestionsProps> = ({ id }) => {

    const isQuestionAnsweredCorrectly = Math.random() > 0.5

    return (
        <>
            <div className='user-question-answer'>
                <div className="user-question-icon">
                    {
                        isQuestionAnsweredCorrectly ?
                            <img src="/discuss/check-circle.svg" alt="question" /> :
                            <img src="/discuss/question.svg" alt="question" />
                    }
                </div>
                <div className="user-question-content">
                    <div className="user-question-title">Lorem ipsum dolor sit, esciuntLorem ipsum dolor sit, esciunt esciunt  incidunt?</div>
                    <div className="user-question-info">
                        <div className="user-question-views">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#149ef1' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>4.5k views
                        </div>
                    </div>
                </div>
            </div>
            <QuestionFormat id={id} />
        </>
    )
}