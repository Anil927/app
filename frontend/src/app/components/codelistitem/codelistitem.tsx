'use client'
import React from 'react'
import './codelistitem.css'

interface Props {
    id: number
    onClick: (id: number, fileType: string) => void
}

const CodeListItem: React.FC<Props> = ({ id, onClick }) => {

    const title = 'title here' // Dummy data for now, this needs to be fetched from the backend
    const views = 108 // Dummy data for now, this needs to be fetched from the backend
    const commentIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // Dummy data for now, this needs to be fetched from the backend
    const time = '2 hours ago' // Dummy data for now, this needs to be fetched from the backend

    // Generate random file type out of html, python, javascript. This needs to be fetched from the backend
    const fileTypes = ['html', 'python', 'javascript']
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)]

    const handleClick = () => {
        onClick(id, fileType)
    }

    let src;
    if (fileType === 'html') {
        src = '/code/html-5.svg'
    } else if (fileType === 'python') {
        src = '/code/python.svg'
    } else if (fileType === 'javascript') {
        src = '/code/javascript.svg'
    }

    return (
        <div onClick={handleClick} className='code-list-item'>
            <div className="code-list-item-icon">
                <img src={src} alt="ic" />
            </div>
            <div className="code-list-item-content">
                <div className="code-list-item-title">
                    <div>{title}</div>
                </div>
                <div className="code-list-item-views-comments-time">
                    <div className="code-list-item-views-comments">
                        <div className="code-list-item-views">
                            <img src="/code/eye.svg" alt="views" /> <div>{views}</div>
                        </div>
                        <div className="code-list-item-comments">
                            <img src="/code/comment-black.svg" alt="comments" /> <div>{commentIds.length}</div>
                        </div>
                    </div>
                    <div className="code-list-item-time">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#8b9093' d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg><div>{time}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeListItem