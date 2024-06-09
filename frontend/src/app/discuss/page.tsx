'use client'
import React from 'react'
import './page.css'
import QuestionListItem from '../components/questionlistitem/questionlistitem';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Discuss = () => {

    const router = useRouter();
    
    const questionListItemIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Dummy data, this will be replaced with actual data from the backend

    const handleQuestionListItemClick = (id: number) => {
            router.push(`/discuss/question?&id=${id}`)
        // Perform the logic to navigate to the question page here
    };


    const handleSearchCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const search = (e.currentTarget as HTMLFormElement).search.value;
        console.log(search);
        // Perform the search logic here
    };

    const handleAskQuestionButtonClick = () => {
        // Perform the logic to navigate to the ask question page here
    };

    return (
        <div style={{margin: '50px 0 51px 0'}}>

            {/* For top search bar */}
            <form onSubmit={handleSearchCode} role="search" >
                <input id="search" type="search" placeholder="Search..." required  />
                <button id='search-btn' type="submit">Go</button>
            </form>

            {/* For question list */}
            {questionListItemIds.map((id) => (
                <QuestionListItem key={id} id={id} onClick={handleQuestionListItemClick} />
            ))}

            {/* For floating ask question button */}
            <Link href='/discuss/ask'>
            <button className="floating-ask-question-button">
                <div className="ask-question-actions">
                    <span className="ask-question-text">Ask question ?</span>
                </div>
            </button>
            </Link>
        </div>
    )
}

export default Discuss
