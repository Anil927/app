'use client'
import React, { useState, useRef, useEffect } from 'react';
import './page.css'; // Import your CSS file
import styles from '../../page.module.css'
import Snackbar from '@/components/snackbar/snackbar';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { requestNotificationPermission } from '@/utils/notification';

const CreatePost: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [image, setImage] = useState<Blob | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const tagInputRef = useRef<HTMLInputElement>(null);
    const [showPostSuccessfulMsg, setShowPostSuccessfulMsg] = useState(false);
    const [showPostErrorMsg, setShowPostErrorMsg] = useState(false);



    useEffect(() => {
        requestNotificationPermission();
    }, []);

    const publicVapidKey = 'BP1WQgGLE5sfhVDHxAMGkdbqtoaBHV-gh_burMF27fWLXYwHCqyVv7hZJ6SVsDvN79oIEfflB4s_0ao8K2NuKQU';

    const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    useEffect(() => {
        // if (typeof window !== 'undefined') {
        //   const button = document.querySelector(".post-button");

        //   const handleClick = () => {
        //     if (navigator.serviceWorker?.controller) {
        //       console.log("Control is now in this block");
        //       navigator.serviceWorker.controller.postMessage({
        //         action: 'showNotification',
        //         title: 'Custom Notification',
        //         body: 'This is a custom notification triggered by clicking the button.',
        //       });
        //     } else {
        //       console.error('Service Worker controller not found');
        //     }
        //   };

        //   button?.addEventListener('click', handleClick);

        //   // Clean up the event listener when the component unmounts
        //   return () => {
        //     button?.removeEventListener('click', handleClick);
        //   };
        // }

        if ('serviceWorker' in navigator && 'PushManager' in window) {
            // if (typeof window !== 'undefined') {
            //     document.querySelector(".post-button")?.addEventListener('click', () => {
            //         if (navigator.serviceWorker?.controller) {
            //             navigator.serviceWorker.controller.postMessage({
            //                 action: 'showNotification',
            //                 title: 'Custom Notification',
            //                 body: 'This is a custom notification triggered by clicking the button.',
            //             });
            //         } else {
            //             console.error('Service Worker controller not found');
            //         }
            //     });
            // }

            // Subscribe the user for push notifications
            const subscribeUser = async () => {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                });

                await fetch('http://localhost:4000/subscribe', {
                    method: 'POST',
                    body: JSON.stringify(subscription),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjY3ZmY3NDNjYTk3NDYzNDMyZThmNjM5IiwidHlwZSI6ImFjY2VzcyIsImV4cCI6MTcyMTkyNjg3NX0._nymi64vw1tkdeEGVukSUssdVacHmHyL69CFaNA1_VI'
                    }
                }).then(response => {
                    if (response.ok) {
                        console.log("subscription successful")   
                    }
                });
                
            };

            subscribeUser();
        }
    }, []);


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

    // const handleSubmit = () => {
    //     if (text.trim() !== '' && tags.length !== 0) {
    //         setShowPostSuccessfulMsg(true);
    //         setTimeout(() => {
    //             setShowPostSuccessfulMsg(false);
    //             router.push('/home')
    //         }, 2000);
    //     } else if (text.trim() === '' || tags.length === 0) {
    //         setShowPostErrorMsg(true);
    //         setTimeout(() => {
    //             setShowPostErrorMsg(false);
    //         }, 2000);
    //     }
    //     setText('');
    //     setImage(null);
    // };


    const handleSubmit = async () => {
        await fetch('http://localhost:4000/sendnotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log("successful sendNotification request");
            }
        })
    }

    useEffect(() => {
        const createPost = async () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjY3ZmY3NDNjYTk3NDYzNDMyZThmNjM5IiwidHlwZSI6ImFjY2VzcyIsImV4cCI6MTcxOTgwNTMzN30.edgDZ9Z8mZNld3wm4cP9S9lH4JcJsaFBrz4HHQ5cqQI'; // Replace with your actual JWT token
            const formData = new FormData();
            formData.append('post', JSON.stringify({
                content: text,
                tags: tags
            }));
            formData.append('image', image ?? ""); // Assuming an <input type="file">

            try {
                const response = await axios.post('http://0.0.0.0:8000/post/createpost', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error creating post:', error);
            }
        };

        // Call the function to create a post
        // createPost();
    }, [])


    


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
                            <div key={index} className="tag-item" onClick={() => handleTagDelete(tag)}>
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
