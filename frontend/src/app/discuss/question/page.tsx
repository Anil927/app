'use client'
import React, { Suspense } from 'react'
import styles from '@/app/page.module.css'
import './page.css'
import QuestionFormat from '@/app/components/qnaformat/qnaformat'
import AnswerFormat from '@/app/components/qnaformat/qnaformat'
import { useSearchParams } from 'next/navigation'


const QnA = () => {

    const searchParams = useSearchParams()
    const id = parseInt(searchParams.get('id') ?? '')
    const answerIds = [1, 2, 3, 4, 5] // dummy data, need to fetch from backend using the id

    const isQuestionAnsweredCorrectly = Math.random() > 0.5

    return (
        <div className={styles.topBottomMargin}>
            <div className='question-answer'>
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
                        <div className="question-views">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#149ef1' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>4.5k views
                        </div>
                    </div>
                </div>
            </div>
            <QuestionFormat id={id} />
            <div style={{ fontWeight: 'bold', padding: "5px 15px", fontSize: '1.2em', backgroundColor: '#333a40', color: '#afb4b7' }}>{answerIds.length} Answers</div>
            {
                answerIds.map((answerId) => {
                    return (
                        <div key={answerId}>
                            <AnswerFormat id={answerId} />
                        </div>
                    )
                })
            }
        </div>
    )
};



const QnAPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <QnA />
        </Suspense>
    )
}

export default QnAPage;