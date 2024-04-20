'use client'
import React, { useState, useEffect } from 'react';
import './bottomsheet.css'

interface ModalProps {
    onClose: () => void;
    noOfComments: number;
}

const Modal: React.FC<ModalProps> = ({ onClose, noOfComments }) => {

    let userProfileImagePath = null;

    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
            onClose();
        }, 300); // 300ms, same duration as the slide down animation
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.modal-content')) {
                handleClose();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <>
            {isOpen && (
                <div className={`modal-overlay ${isClosing ? 'fade-out' : ''}`}>
                    <div className={`modal-content ${isClosing ? 'slide-down' : ''}`}>
                        <button className="close-button" onClick={handleClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill='#007BFF' d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                        </button>
                        <div className='no-of-comments'>
                            {noOfComments} Comments
                        </div>
                        <div className="comment-area">
                            <div className="avatar-and-comment-area">
                                <img src={userProfileImagePath ?? "https://www.w3schools.com/howto/img_avatar.png"} alt='profile' />
                                <div>
                                    <textarea placeholder="Add a comment"></textarea>
                                </div>
                            </div>
                            <div className="cancel-and-comment-btn">
                                <button>Cancel</button>
                                <button>Comment</button>
                            </div>
                        </div>
                        <div className="other-comments">
                            {/* <UserComment /> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;