'use client'
import React from 'react'
import './page.css'
import QuestionListItem from '../components/questionlistitem/questionlistitem';
import { useRouter } from 'next/navigation';


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

    return (
        <div style={{margin: '90px 0 51px 0'}}>

            {/* For top search bar */}
            <form onSubmit={handleSearchCode} role="search">
                <input id="search" type="search" placeholder="Search..." required />
                <button id='search-btn' type="submit">Go</button>
            </form>

            {/* For question list */}
            {questionListItemIds.map((id) => (
                <QuestionListItem key={id} id={id} onClick={handleQuestionListItemClick} />
            ))}
        </div>
    )
}

export default Discuss
