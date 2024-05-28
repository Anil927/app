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
    
    // Generate random file type out of html, python, javascript. This needs to be fetched from the backend
    const fileTypes = ['html', 'python', 'javascript']
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)]

    const handleClick = () => {
        onClick(id, fileType)
    }

    let src;
    if (fileType === 'html') {
        src = './code/html-5.svg'
    } else if (fileType === 'python') {
        src = './code/python.svg'
    } else if (fileType === 'javascript') {
        src = './code/javascript.svg'
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
                <div className="code-list-item-views-comments">
                    <div className="code-list-item-views">
                        <img src="./code/eye.svg" alt="views" /> <div>{views}</div>
                    </div>
                    <div className="code-list-item-comments">
                        <img src="./code/comments.svg" alt="comments" /> <div>{commentIds.length}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeListItem