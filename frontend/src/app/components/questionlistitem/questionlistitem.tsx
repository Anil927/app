import React from 'react'
import './questionlistitem.css'

interface Props {
    id: number
    onClick: (id: number) => void
}

const QuestionListItem: React.FC<Props> = ({ id, onClick }) => {

    const handleClick = () => {
        onClick(id)
    }

    const isQuestionAnsweredCorrectly = Math.random() > 0.5

    return (
        <div onClick={handleClick} className='question'>
            <div className="question-icon">
                {
                    isQuestionAnsweredCorrectly ?
                        <img src="/discuss/check-circle.svg" alt="question" /> :
                        <img src="/discuss/question.svg" alt="question" />
                }
            </div>
            <div className="question-content">
                <div className="question-title">Lorem ipsum dolor sit, esciuntLorem ipsum dolor sit, esciunt esciunt  incidunt?</div>
                <div className="question-info">
                    <div className="views-answers-author">
                        <div className="answers"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#7db343' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>5 answers</div>
                        <div className="author"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#149ef1' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>by maverick</div>
                    </div>
                    <div className="time">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='rgb(19, 176, 111)' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>1 min ago
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionListItem