'use client'
import React, { useState, useRef, KeyboardEvent } from 'react';
import './page.css';
import styles from '../../page.module.css';
import Snackbar from '@/components/snackbar/snackbar';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('@/components/richtexteditor/richtexteditor'), {
  ssr: false
});

const AskQuestion: React.FC = () => {

    const content = '';
    const rawContent = '';

    const [question, setQuestion] = useState<[string, string]>([content, rawContent]);
    const [questionTitle, setQuestionTitle] = useState<string>('');
    const [isAsked, setIsAsked] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const tagInputRef = useRef<HTMLInputElement>(null);

    const handleTagInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.currentTarget.value.trim() !== '') {
            setTags([...tags, event.currentTarget.value.trim()]);
            event.currentTarget.value = '';
        }
    };

    const handleTagEnter = () => {
        handleTagInput({ key: 'Enter', currentTarget: tagInputRef.current } as KeyboardEvent<HTMLInputElement>);
    }
    

    const handleTagDelete = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    }

    const handleQuestionPublish = (content: string, rawContent: string) => {
        setIsAsked(true);
        setQuestion([content, rawContent]);
        // logic to publish question to backend

        setTimeout(() => {
            setIsAsked(false);
        }, 2000);
    }

    return (
        <div className={`container ${styles.topBottomMargin}`}>

            {/* Tags Input */}
            <div className="question-tags-container">
                <label htmlFor="tags" className="tags-label">
                    Tags:
                </label>
                <div className="question-tags-list">
                    {tags.map((tag, index) => (
                        <div key={index} className="question-tag-item" onClick={() => handleTagDelete(tag)}>
                            {tag}
                        </div>
                    ))}
                </div>
                <div className="input-and-button">
                    <input
                    type="text"
                    id="tags"
                    ref={tagInputRef}
                    placeholder="Add tags (hit Enter to add)"
                    className="question-tags-input"
                    onKeyUp={handleTagInput}
                />
                <button onClick={handleTagEnter}>Enter</button>
                </div>
                <p className="question-tags-hint">Info: About which your question is related to, e.g: JavaScript, Html, Css, Sorting Algorithm, Quick Sort, Python, etc.
                </p>
            </div>

            <input
                type="text"
                placeholder="Ask your question here..."
                className="text-input"
                max={150}
                onChange={(e) => setQuestionTitle(e.target.value)}
            />
            <QuillEditor value='Description here...' onPublish={handleQuestionPublish} />
            {
                isAsked && question[0] && questionTitle && (tags.length > 0) && <Snackbar message="Question asked successfully" />
            }
            {
                isAsked && (!question[0] || !questionTitle || (tags.length === 0)) && <Snackbar message="! Tags, Question and Description can't be empty" />
            }

            <div style={{ width: '100%', height: 'calc(100vh - 600px)', backgroundColor: '#333a40' }}>

            </div>
        </div>
    );
};

export default AskQuestion;
