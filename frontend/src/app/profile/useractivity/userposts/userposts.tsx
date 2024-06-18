import FeedPost from '@/components/feedpost/feedpost'
import React from 'react'

const UserPosts = () => {
    return (
        <div>
            <FeedPost
                postId={1}
                profileImagePath='https://www.w3schools.com/howto/img_avatar.png'
                username='John Doe'
                designation='Software Engineer'
                time='1h ago'
                postContent='Hello, this is my first post'
                postImagePath='https://via.placeholder.com/500'
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
        </div>
    )
}

export default UserPosts