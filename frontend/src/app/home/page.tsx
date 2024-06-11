'use client'
import React, { useEffect, useState } from 'react'
import './page.css'
import '@/app/code/searchbar.css'
import FeedPost from '../components/feedpost/feedpost'
import Link from 'next/link'
import Image from 'next/image'


const Home = () => {

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

    const handleSearchCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const search = (e.currentTarget as HTMLFormElement).search.value;
        console.log(search);
    }

    return (
        <div style={{ margin: "90px 0 54px 0" }} >

            <div className='search-bar-and-post'>

                <div>
                    <form id="search-bar" className={showSearchBar ? '' : 'hidden'} onSubmit={handleSearchCode} role="search">
                        <input id="search" type="search" placeholder="Search..." required />
                        <input id='reset' type="reset" value="x" alt="Clear the search form" />
                        <button id='search-btn' type="submit">
                            <Image src="./code/search-code.svg" alt="Search" width={20} height={20} />
                        </button>
                    </form>
                </div>

                <Link href='/home/createpost' style={{ marginBottom: '-3px' }}>
                    <div className={`post ${showSearchBar ? '' : 'hidden'}`}>
                        <Image src='./home/post-add-home.svg' alt='Create Post' width={25} height={25} />
                    </div>
                </Link>
            </div>

            <FeedPost
                postId={1}
                profileImagePath='https://www.w3schools.com/howto/img_avatar.png'
                username='John Doe'
                designation='Software Engineer'
                time='1h ago'
                postContent='Hello, this is my first post'
                postImagePath='./code/html-5.svg'
                noOfLikes={10}
                noOfComments={20}
            />

            <FeedPost
                postId={2}
                profileImagePath='https://www.w3schools.com/howto/img_avatar.png'
                username='John Doe'
                designation='Software Engineer'
                time='1h ago'
                postContent='Hello, this is my first post'
                noOfLikes={10}
                noOfComments={0}
            />

            <FeedPost
                postId={3}
                username='John Doe'
                designation='Software Engineer'
                time='1h ago'
                postContent='Hello, this is my first post'
                postImagePath='https://via.placeholder.com/500'
                noOfLikes={10}
                noOfComments={20}
            />

            <FeedPost
                postId={3}
                username='John Doe'
                designation='Software Engineer'
                time='1h ago'
                postContent='Hello, this is my first post'
                postImagePath='./code/css3.svg'
                noOfLikes={10}
                noOfComments={20}
            />
        </div>
    )
}

export default Home
