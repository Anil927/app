'use client'
import styles from '../page.module.css';
import React, { useRef, useState } from 'react';
import './page.css';
import Streak from './streak/streak';
import Link from 'next/link';

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState('Bio goes here...');

    const bioRef = useRef<HTMLParagraphElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditBio = () => {
        setIsEditing(true);
    };

    const handleSaveBio = () => {
        if (inputRef.current) {
            setBio(inputRef.current.value);
            setIsEditing(false);
        }
    };

    const handleEditProfileImage = () => {
        console.log('Edit profile image');
    };

    return (
        <div className={styles.topBottomMargin}>
            <div className="profile-container">
                <div className="profile-header">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" className="profile-image" />
                    {/* create a circle filled with color green */}
                    <img className='profile-image-edit' onClick={handleEditProfileImage} src="/profile/camera-fill.svg" alt="edit" />
                    <h2 className="profile-username">Username</h2>
                    {isEditing ? (
                        <div>
                            <input ref={inputRef} type="text" defaultValue={bio} />
                            <button onClick={handleSaveBio}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <span ref={bioRef} className="profile-bio">{bio}</span>
                            <button onClick={handleEditBio}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill='#fff' d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <div className="profile-details">
                    <div className="profile-detail-item">
                        <span className="detail-label">Level:</span>
                        <span className="detail-value">Bronze</span>
                    </div>
                    <div className="profile-detail-item">
                        <span className="detail-label">Followers:</span>
                        <span className="detail-value">1000</span>
                    </div>
                    <div className="profile-detail-item">
                        <span className="detail-label">Following:</span>
                        <span className="detail-value">200</span>
                    </div>
                </div>
            </div>
            <div className="profile-additional-details">
                <div className="streak-container">
                    <span>Streak Saver</span>
                    <Streak />
                </div>
                <div>
                    <span style={{ fontSize: "12px" }}>Your code bits, posts, questions etc.</span>
                    <Link href="/profile/useractivity"><button>See Activity</button></Link>
                </div>
                <div>
                    <span style={{ fontSize: "12px" }}>Saved code bits, posts, questions etc.</span>
                    <Link href="/profile/userdownloads"><button>Bookmarks</button></Link>
                </div>

            </div>
        </div >
    );
};

export default Profile;



// 10 levels of profile

// Bronze
// Silver
// Gold
// Platinum
// Diamond
// Master
// Grandmaster
// Challenger
// Legend
// Immortal
