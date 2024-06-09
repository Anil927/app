'use client'
import React, { useState, useEffect, useRef } from 'react';
import './bottomsheet.css'
import Snackbar from '../snackbar/snackbar';

import otherUserCommentsData from '../feedpost/otherusercomments.json'

interface ModalProps {
    postId: number;
    onClose: () => void;
    noOfComments: number;
    callback: (commentsCount: number) => void;
}

let userProfileImagePath: string = '';

const Modal: React.FC<ModalProps> = ({ onClose, noOfComments, callback, postId }) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [isEditedComment, setIsEditedComment] = useState(false);
    const [editedCommentNo, setEditedCommentNo] = useState<number>(0);
    const [comments, setComments] = useState<string[]>([]);
    const [isOutsideClick, setIsOutsideClick] = useState(false);



    const sendCommentsCountToParent = () => {
        // Send the updated comments count to the parent component
        callback(noOfComments + comments.length);
    }

    const handleCancelComment = () => {
        // Empty the textarea content and remove focus from the textarea
        if (textareaRef.current) {
            textareaRef.current.value = '';
            textareaRef.current.blur();
        }
    };


    const handleSubmitComment = () => {
        if (textareaRef.current && textareaRef.current.value.trim() !== '' && comments.length < 3 && !isEditedComment) {
            // Add the comment to the comments array
            setComments([...comments, textareaRef.current.value]);
            // Empty the textarea content and remove focus from the textarea
            textareaRef.current.value = '';
        } else if (comments.length === 3 && !isEditedComment && textareaRef.current && textareaRef.current.value.trim() !== '') {
            // Show snackbar if the user tries to add more than 3 comments
            setShowSnackbar(true);
            setTimeout(() => {
                setShowSnackbar(false);
            }, 2000);
        } else if (textareaRef.current && isEditedComment) {
            // If the user is editing a comment, then update the comment in the comments array
            console.log(comments)
            const newComments = [...comments];
            newComments[editedCommentNo - 1] = textareaRef.current.value;
            setComments(newComments);
            console.log(comments)
            setIsEditedComment(false);
            setEditedCommentNo(0);
            textareaRef.current.value = '';
        }
    };

    const handleEditComment = (commentNo: number) => {
        if (textareaRef.current) {
            textareaRef.current.value = comments[commentNo - 1];
            textareaRef.current.focus();
            setIsEditedComment(true);
            setEditedCommentNo(commentNo);
        }
    };

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
            onClose();
            sendCommentsCountToParent();
        }, 300); // 300ms, same duration as the slide down animation
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.modal-content')) {
                setIsOutsideClick(true);
                handleClose();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            sendCommentsCountToParent()
        }, 300)
    }, [isOutsideClick]);

    const otherusercomments = otherUserCommentsData.find(item => item.postId === postId)?.comments || [];


    return (
        <>
            {isOpen && (
                <div className={`modal-overlay ${isClosing ? 'fade-out' : ''}`}>
                    <div className={`modal-content ${isClosing ? 'slide-down' : ''}`} style={{ backgroundColor: localStorage.getItem('theme') === 'dark' ? '#121212' : 'white'}}>
                        <button className="close-button" onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill='#007BFF' d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                        </button>
                        <div className='no-of-comments'>
                            {noOfComments + comments.length} Comments
                        </div>
                        <div className="comment-area">
                            <div className="avatar-and-comment-area">
                                <img src={userProfileImagePath ?? "https://www.w3schools.com/howto/img_avatar.png"} alt='profile' />
                                <div>
                                    <textarea maxLength={1000} ref={textareaRef} placeholder="Add a comment"></textarea>
                                </div>
                            </div>
                            <div className="cancel-and-comment-btn">
                                <button onClick={handleCancelComment}>Cancel</button>
                                <button onClick={handleSubmitComment}>Comment</button>
                            </div>
                        </div>
                        <div className="user-comments">
                            {
                                comments.length > 0 && comments.map((comment: string, index: number) => (
                                    <>
                                        <UserComment key={comments.indexOf(comment)} commentContent={comment} handleEditComment={handleEditComment} commentNo={index + 1} />
                                        {
                                            showSnackbar && <Snackbar message="You can do maximum 3 comments" />
                                        }
                                    </>
                                ))
                            }
                            {
                                noOfComments + comments.length === 0 && <div className="no-comments">No comments yet</div>
                            }
                            {
                                otherusercomments.length > 0 && otherusercomments.map((comment: any, index: number) => (
                                    <OtherUserComment key={comment.id} commentContent={comment.comment} username={comment.user} otherUserprofileImagePath={comment.otherUserprofileImagePath} time={comment.time} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;




interface UserCommentProps {
    commentContent: string;
    handleEditComment: (commentNo: number) => void;
    commentNo: number;
}

const UserComment: React.FC<UserCommentProps> = ({ commentContent, handleEditComment, commentNo }) => {

    let time = "1 min ago";

    return (
        <div className="comment">
            <div className="comment-body">
                <img src={userProfileImagePath ?? "https://www.w3schools.com/howto/img_avatar.png"} alt='profile' />
                <div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg>  Username <button onClick={() => handleEditComment(commentNo)}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#5794ff" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg></button> &nbsp; <span>{time}</span>
                    </div>
                    <div>{commentContent}</div>
                </div>
            </div>
        </div>
    );
}


interface OtherUserCommentProps {
    commentContent: string;
    username: string;
    otherUserprofileImagePath: string;
    time: string
}

const OtherUserComment: React.FC <OtherUserCommentProps> = ({ commentContent, username, otherUserprofileImagePath, time }) => {
    return (
        <div className="comment">
            <div className="comment-body">
                <img src={otherUserprofileImagePath ?? "https://www.w3schools.com/howto/img_avatar.png"} alt='profile' />
                <div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" /></svg> {username} &nbsp; <span>{time}</span>
                    </div>
                    <div>{commentContent}</div>
                </div>
            </div>
        </div>
    );
}