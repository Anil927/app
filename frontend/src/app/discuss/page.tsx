'use client'
import React,  { useState, useEffect } from 'react'
import './page.css'
import './../code/searchbar.css'
import QuestionListItem from '../components/questionlistitem/questionlistitem';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';


const Discuss = () => {

    const router = useRouter();
    
    const questionListItemIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

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

    const [showSearchBar, setShowSearchBar] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                if (scrollTop - lastScrollTop > 200) {
                    setShowSearchBar(false);
                    setLastScrollTop(scrollTop);
                }
            } else {
                // Scrolling up
                if (lastScrollTop - scrollTop > 200) {
                    setShowSearchBar(true);
                    setLastScrollTop(scrollTop);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return (
        <div style={{margin: '90px 0 54px 0'}}>

            {/* For top search bar */}
            <form id="search-bar" className={showSearchBar ? '' : 'hidden'} onSubmit={handleSearchCode} role="search">
                <input id="search" type="search" placeholder="Search..." required />
                <input id='reset' type="reset" value="x" alt="Clear the search form" />
                <button id='search-btn' type="submit">
                    <Image src="./code/search-code.svg" alt="Search" width={20} height={20} />
                </button>
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
