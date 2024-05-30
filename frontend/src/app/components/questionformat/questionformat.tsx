import React from 'react'
import './questionformat.css'

interface QuestionProps {
    id: number
}

const QuestionFormat: React.FC<QuestionProps> = ({ id }) => {


    const isQuestionAnsweredCorrectly = Math.random() > 0.5

    return (
        <div>
            
        </div>

    )
}

export default QuestionFormat