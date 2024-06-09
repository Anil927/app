import React from 'react'
import './page.css'
import styles from '../page.module.css'
import FeedPost from '../components/feedpost/feedpost'
import Link from 'next/link'


const Home = () => {

    return (
        <div className={styles.topBottomMargin} >

            <div className='search-bar-and-post'>
                <div className='search-bar'>
                    <input placeholder='search people, posts' type='text' />
                </div>
                <div className='post'>
                    <Link href='/home/createpost'><button>post</button></Link>
                </div>
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
