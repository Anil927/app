import AnswerFormat from '@/app/components/qnaformat/qnaformat'
import React from 'react'

const UserAnswers = () => {

    const userAnswerIds = [1, 2, 3, 4, 5] // dummy data, need to fetch from backend

    return (
        <div>
            {
                userAnswerIds.map((id) => {
                    return (
                        <>
                            <AnswerFormat key={id} id={id} />
                        </>
                    )
                })
            }
        </div>
    )
}

export default UserAnswers