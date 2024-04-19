import React from 'react'
import './page.css'
import styles from '../page.module.css'
import FeedPost from '../components/feedpost/feedpost'


const Home = () => {
    return (
        <div className={styles.topBottomMargin}>

            <div className='search-bar-and-post'>
                <div className='search-bar'>
                    <input placeholder='search people, posts' type='text' />
                </div>
                <div className='post'>
                    <button>post</button>
                </div>
            </div>

            <FeedPost 
                profileImagePath='https://www.w3schools.com/howto/img_avatar.png'
                username='John Doe'
                designation='Software Engineer'
                time='1h ago'
                postContent='Hello, this is my first post'
                postImagePath='https://via.placeholder.com/500'
            />
            
            <FeedPost 
                profileImagePath='https://www.w3schools.com/howto/img_avatar.png'
                username='John Doe'
                designation='Software Engineer'
                time='1h ago'
                postContent='Hello, this is my first post'
            />

            <FeedPost 
                profileImagePath='https://www.w3schools.com/howto/img_avatar.png'
                username='John Doe'
                designation='Software Engineer'
                time='1h ago'
                postContent='Hello, this is my first post'
                postImagePath='https://via.placeholder.com/500'
            />
        </div>
    )
}

export default Home
