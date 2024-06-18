'use client'
import React, { useState, useRef } from 'react';
import './page.css'; // Import your CSS file
import styles from '../../page.module.css'
import Snackbar from '@/components/snackbar/snackbar';
import { useRouter } from 'next/navigation';

const CreatePost: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const tagInputRef = useRef<HTMLInputElement>(null);
    const [showPostSuccessfulMsg, setShowPostSuccessfulMsg] = useState(false);
    const [showPostErrorMsg, setShowPostErrorMsg] = useState(false);

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    };

    const handleTagInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.currentTarget.value.trim() !== '') {
            setTags([...tags, event.currentTarget.value.trim()]);
            event.currentTarget.value = '';
        }
    };

    const handleTagDelete = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    }

    const router = useRouter()

    const handleSubmit = () => {
        if (text.trim() !== '' && tags.length !== 0) {
            setShowPostSuccessfulMsg(true);
            setTimeout(() => {
                setShowPostSuccessfulMsg(false);
                router.push('/home')
            }, 2000);
        } else if ( text.trim() === '' || tags.length === 0) {
            setShowPostErrorMsg(true);
            setTimeout(() => {
                setShowPostErrorMsg(false);
            } , 2000);
        }
        setText('');
        setImage(null);
    };

    return (
        <div className={styles.topBottomMargin}>
            <div className="post-container">
                <h1 className="post-title">Create a New Post</h1>

                {/* Text Description Input */}
                <textarea
                    className="post-textarea"
                    placeholder="Write something about your post..."
                    value={text}
                    onChange={handleTextChange}
                    rows={4}
                    cols={50}
                ></textarea>

                {/* Image Upload */}
                <label htmlFor="image" className="image-upload-label">
                    Upload Image:
                </label>
                <div className="image-upload-container">
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="image-upload-input"
                    />
                </div>

                {/* Preview Image */}
                {image && (
                    <div className="image-preview-container">
                        <h3 className="image-preview-title">Preview:</h3>
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="image-preview"
                        />
                    </div>
                )}

                {/* Tags Input */}
                <div className="tags-container">
                        <label htmlFor="tags" className="tags-label">
                            Tags:
                        </label>
                        <div className="tags-list">
                            {tags.map((tag, index) => (
                                <div key={index} className="tag-item"onClick={() => handleTagDelete(tag)}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            id="tags"
                            ref={tagInputRef}
                            placeholder="Add tags (hit Enter to add)"
                            className="tags-input"
                            onKeyDown={handleTagInput}
                        />
                    <p className="tags-hint">Info: About which your post is related to, e.g: JavaScript, Html, Css, Sorting Algorithm, Quick Sort, Python, etc.</p>
                </div>

                {/* Post Button */}
                <button className="post-button" onClick={handleSubmit}>
                    Post
                </button>

                {
                    showPostSuccessfulMsg && <Snackbar message='Posted Successfully' />
                }
                {
                    showPostErrorMsg && <Snackbar message='Content and Tags cannot be empty' />
                }
            </div>
        </div>
    );
};

export default CreatePost;
