'use client'
import React from 'react'
import styles from '@/app/page.module.css'
import './page.css'
import QuestionFormat from '@/app/components/questionformat/questionformat'
import { useSearchParams } from 'next/navigation'

const QnA = () => {

    const searchParams = useSearchParams()
    const id = parseInt(searchParams.get('id') ?? '')

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
                        <div className="views">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#149ef1' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>4.5k views
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{width: '90%', textAlign: 'center', height: '0.3px', opacity: '0.3'}}/>
            <QuestionFormat id={id} />
        </div>
    )
}

export default QnA