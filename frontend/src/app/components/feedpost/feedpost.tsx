'use client'
import React, { useState } from 'react'
import './feedpost.css'
import CommentModal from '../bottomsheet/bottomsheet'
import Image from 'next/image'

interface Props {
    postId: number,
    profileImagePath?: string,
    username: string,
    designation: string,
    time: string,
    postContent: string,
    postImagePath?: string,
    noOfLikes: number,
    noOfComments: number,
}

const FeedPost: React.FC<Props> = ({
    postId,
    profileImagePath,
    username,
    designation,
    time,
    postContent,
    postImagePath,
    noOfLikes,
    noOfComments,
}) => {

    const [likeCommentSaveCount, setLikeCommentSaveCount] = useState<number[]>([0, noOfComments, 0]);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    const handleCommentCallback = (commentsCount: number) => {
        const newCount = [...likeCommentSaveCount]
        newCount[1] = commentsCount;
        setLikeCommentSaveCount(newCount);
    }

    const handleLikeCommentSaveClick = (key: string) => {
        const newCount = [...likeCommentSaveCount];
        if (key === 'like') {
            newCount[0] = newCount[0] === 0 ? 1 : 0;
        } else if (key === 'save') {
            newCount[2] = newCount[2] === 0 ? 1 : 0;
        }
        setLikeCommentSaveCount(newCount);
    };


    // For opening and closing comment modal
    const openCommentModal = () => {
        setIsCommentModalOpen(true);
        document.body.style.overflow = 'hidden';  // Disable scrolling
    };

    const closeCommentModal = () => {
        handleLikeCommentSaveClick('comment');
        setIsCommentModalOpen(false);
        document.body.style.overflow = 'auto';  // Enable scrolling
    };

    // For sharing feed posts, using webshare api
    const handleShareClick = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Share this',
                    text: 'Check out this awesome content!',
                    url: window.location.href,
                });
            } else {
                throw new Error('Web Share API is not supported in this browser.');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <div>
            <div className='feed-post'>
                <div className='feed-post-header'>
                    <div className='feed-post-header-left'>
                        <img src={profileImagePath ?? "https://www.w3schools.com/howto/img_avatar.png"} alt='profile' />
                        <div>
                            <div>{username}</div>
                            <div>{designation}</div>
                            <div>{time}</div>
                        </div>
                    </div>
                    <div className='feed-post-header-right'>
                        <button>+ Follow</button>
                    </div>
                </div>
                <div className='feed-post-body'>
                    <div>
                        {postContent}
                    </div>
                </div>
                {
                    postImagePath &&
                    <div className='feed-post-image'>
                        <img src={postImagePath} alt='post' />
                    </div>
                }
                <div className='feed-post-content'>
                    <div className='feed-post-content-left'>
                        <button onClick={() => handleLikeCommentSaveClick('like')} style={{marginTop: '-4px'}}>
                            {/* {
                                likeCommentSaveCount[0] === 1 ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ff4033" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>
                            }
                            <div>{noOfLikes + likeCommentSaveCount[0]}</div> */}
                            <Image src="./home/like-post.svg" alt="like" width={20} height={20} /> <div style={{marginBottom: '-3px'}}>1.2k</div>
                        </button>
                        <button onClick={openCommentModal}>
                            {/* {
                                likeCommentSaveCount[1] > noOfComments ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#20a7db" d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z" /></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z" /></svg>
                            }
                            <div>{likeCommentSaveCount[1]}</div> */}
                            <Image src="./home/comment-post.svg" alt="comment" width={20} height={20} /> <div style={{marginTop: '-2px'}}>2.4k</div>
                        </button>
                        {isCommentModalOpen && <CommentModal callback={handleCommentCallback} postId={postId} noOfComments={likeCommentSaveCount[1]} onClose={closeCommentModal} />}
                        <button onClick={handleShareClick}>
                            {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                             <path d="M400 255.4V240 208c0-8.8-7.2-16-16-16H352 336 289.5c-50.9 0-93.9 33.5-108.3 79.6c-3.3-9.4-5.2-19.8-5.2-31.6c0-61.9 50.1-112 112-112h48 16 32c8.8 0 16-7.2 16-16V80 64.6L506 160 400 255.4zM336 240h16v48c0 17.7 14.3 32 32 32h3.7c7.9 0 15.5-2.9 21.4-8.2l139-125.1c7.6-6.8 11.9-16.5 11.9-26.7s-4.3-19.9-11.9-26.7L409.9 8.9C403.5 3.2 395.3 0 386.7 0C367.5 0 352 15.5 352 34.7V80H336 304 288c-88.4 0-160 71.6-160 160c0 60.4 34.6 99.1 63.9 120.9c5.9 4.4 11.5 8.1 16.7 11.2c4.4 2.7 8.5 4.9 11.9 6.6c3.4 1.7 6.2 3 8.2 3.9c2.2 1 4.6 1.4 7.1 1.4h2.5c9.8 0 17.8-8 17.8-17.8c0-7.8-5.3-14.7-11.6-19.5l0 0c-.4-.3-.7-.5-1.1-.8c-1.7-1.1-3.4-2.5-5-4.1c-.8-.8-1.7-1.6-2.5-2.6s-1.6-1.9-2.4-2.9c-1.8-2.5-3.5-5.3-5-8.5c-2.6-6-4.3-13.3-4.3-22.4c0-36.1 29.3-65.5 65.5-65.5H304h32zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H408c39.8 0 72-32.2 72-72V376c0-13.3-10.7-24-24-24s-24 10.7-24 24v64c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z" /></svg><div>Share</div> */}
                            <Image src="./home/share-post.svg" alt="comment" width={20} height={20} /> <div style={{marginTop: '-2px'}}>38</div>
                        </button>
                    </div>
                    <div className='feed-post-content-right'>
                        <button onClick={() => handleLikeCommentSaveClick('save')}>
                            {/* {
                                likeCommentSaveCount[2] === 1 ?
                                    <><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#FFD43B" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" /></svg><div>Saved</div></>
                                    :
                                    <><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" ><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" /></svg><div>Save</div></>
                            } */}
                            <Image src="./home/bookmark-post.svg" alt="comment" width={20} height={20} /> <div style={{marginTop: '-2px'}}>save</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedPost
