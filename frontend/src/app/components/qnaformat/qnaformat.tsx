import React, { useState } from 'react';
import './qnaformat.css';
import 'highlight.js/styles/pojoaque.css'
import Snackbar from '../snackbar/snackbar';
import Image from 'next/image';
import QuillEditor from '../richtexteditor/richtexteditor';


interface QnAProps {
    id: number;
}

const QnAFormat: React.FC<QnAProps> = ({ id }) => {

    const [isEditMode, setIsEditMode] = useState(false);

    const [showUpvoteMsg, setShowUpvoteMsg] = useState(false);
    const [showDownvoteMsg, setShowDownvoteMsg] = useState(false);

    const voteCount = 57;
    const isUpvotedByUser = false;
    const isDownvotedByUser = false;
    const isBookmarkedByUser = false;
    const questionOrAnswerType = 'answered'; // needs to be fetched from backend using the id
    const Answer = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis nihil architecto odio nam illo beatae quasi eveniet nobis dicta voluptatibus aliquam, perspiciatis pariatur omnis illum aut, alias quaerat libero.Perferendis assumenda reprehenderit totam, cum, temporibus quos repellendus inventore autem eveniet sequi architecto eligendi maiores asperiores similique natus officia corporis explicabo voluptatem sapiente fugit velit minima ab recusandae officiis! Et?Animi eveniet quisquam provident esse ab maiores laboriosam nesciunt, officiis repellendus pariatur nostrum cupiditate modi sint, tenetur fugit et rerum nihil explicabo placeat debitis illum? Laboriosam architecto consectetur mollitia aperiam.'
    const rawAnswer = '<p> hell0</p>' // dummy data , needs to be fetched from backend using the id

    const [voteCountState, setVoteCountState] = useState(voteCount);
    const [isUpvoteClicked, setIsUpvoteClicked] = useState(isUpvotedByUser);
    const [isDownvoteClicked, setIsDownvoteClicked] = useState(isDownvotedByUser);
    const [isBookmarked, setIsBookmarked] = useState(isBookmarkedByUser);
    const [answer, setAnswer] = useState([Answer, rawAnswer]);

    const handleUpvoteClick = () => {
        setIsUpvoteClicked(!isUpvoteClicked);
        isDownvoteClicked ? setVoteCountState(voteCountState + 2) : isUpvoteClicked ? setVoteCountState(voteCountState - 1) : setVoteCountState(voteCountState + 1);
        setIsDownvoteClicked(false);
        !isUpvoteClicked ? setShowUpvoteMsg(true) : setShowUpvoteMsg(false);
        setTimeout(() => {
            setShowUpvoteMsg(false);
        }, 2000);
    };

    const handleDownvoteClick = () => {
        setIsDownvoteClicked(!isDownvoteClicked);
        isUpvoteClicked ? setVoteCountState(voteCountState - 2) : isDownvoteClicked ? setVoteCountState(voteCountState + 1) : setVoteCountState(voteCountState - 1);
        setIsUpvoteClicked(false);
        !isDownvoteClicked ? setShowDownvoteMsg(true) : setShowDownvoteMsg(false);
        setTimeout(() => {
            setShowDownvoteMsg(false);
        }, 2000);
    };

    const handleEditMode = () => {
        setIsEditMode(true);
    };


    const handlePublish = (content: string, rawContent: string) => {
        setAnswer([content, rawContent]);
        setIsEditMode(false);
    };


    return (
        isEditMode !== true ?
            <div className='qna-format'>
                <div className="qna-analytics">
                    <div className="upvote" onClick={handleUpvoteClick}>
                        {
                            (isUpvotedByUser || isUpvoteClicked) ? <Image src="/discuss/chevron-up-filled.svg" alt="upvote" width={34} height={34} /> : <Image src="/discuss/chevron-up.svg" alt="upvote" width={27} height={27} />
                        }
                        {
                            showUpvoteMsg ? <Snackbar message="This answer is useful. Upvoted! " /> : null
                        }
                    </div>
                    <div className="vote-count" style={{ letterSpacing: '1px', marginLeft: '-10px', fontSize: '0.8em' }}>
                        <span style={{marginRight: '2px'}}>{voteCountState > 0 ? '+' : ""}</span>{voteCountState}
                    </div>
                    <div className="downvote" onClick={handleDownvoteClick}>
                        {
                            (isDownvotedByUser || isDownvoteClicked) ? <Image src="/discuss/chevron-down-filled.svg" alt="downvote" width={34} height={34} /> : <Image src="/discuss/chevron-down.svg" alt="downvote" width={27} height={27} />
                        }
                        {
                            showDownvoteMsg ? <Snackbar message="This answer is not useful. Downvoted!" /> : null
                        }
                    </div>
                    <div className="qna-bookmark" onClick={() => setIsBookmarked(!isBookmarked)}>
                        {
                            isBookmarked ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#FFD43B" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" /></svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" ><path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" /></svg>
                        }
                    </div>
                </div>
                <div className="qna-content">
                    <div className="qna-content-main" dangerouslySetInnerHTML={{ __html: answer[0] }} ></div>
                    <div className="qna-content-profile">
                        <div className="qna-content-profile-edit">
                            <button className='qna-edit-button' onClick={handleEditMode}>Edit</button>
                        </div>
                        <div className="qna-content-profile-info">
                            <div className="qna-info-time">
                                {questionOrAnswerType} 2 days ago
                            </div>
                            <div className="qna-info-user">
                                <div className="qna-user-profile">
                                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user" />
                                </div>
                                <div className="qna-user-name-level">
                                    <div className="qna-user-name">
                                        John Doe
                                    </div>
                                    <div className="qna-user-level">
                                        Level: Challenger
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div>
                <QuillEditor value={answer[1]} onPublish={handlePublish} />
            </div>

    );
};

export default QnAFormat;
