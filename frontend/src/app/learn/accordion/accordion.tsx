'use client'
import React, { useState } from 'react';
import './accordion.css';

interface AccordionItem {
    id: number;
    label: string;
    labelImg: string;
    content: [{ id: number; title: string; url: string; }[], { id: number; title: string; url: string; }[]];
}

const accordionItems: AccordionItem[] = [
    {
        id: 0, label: 'TERMUX', labelImg: './learn/termux.png', content: [
            [
                { id: 0, title: 'Video 1', url: 'https://example.com/video1' },
                { id: 1, title: 'Video 2', url: 'https://example.com/video2' },
            ],
            [
                { id: 0, title: 'Material 1', url: 'https://example.com/material1' },
                { id: 1, title: 'Material 2', url: 'https://example.com/material2' },
            ],
        ]
    },
    {
        id: 1, label: 'PYTHON', labelImg: '/code/python.svg', content: [
            [
                { id: 0, title: 'Video 1', url: 'https://example.com/video1' },
                { id: 1, title: 'Video 2', url: 'https://example.com/video2' },
            ],
            [
                { id: 0, title: 'Material 1', url: 'https://example.com/material1' },
                { id: 1, title: 'Material 2', url: 'https://example.com/material2' },
            ],
        ]
    },
    {
        id: 2, label: 'HTML CSS JS', labelImg: './code/html-5.svg', content: [
            [
                { id: 0, title: 'Video 1', url: 'https://example.com/video1' },
                { id: 1, title: 'Video 2', url: 'https://example.com/video2' },
            ],
            [
                { id: 0, title: 'Material 1', url: 'https://example.com/material1' },
                { id: 1, title: 'Material 2', url: 'https://example.com/material2' },
            ],
        ]
    },
    {
        id: 3, label: 'GIT', labelImg: './learn/termux.png', content: [
            [
                { id: 0, title: 'Video 1', url: 'https://example.com/video1' },
                { id: 1, title: 'Video 2', url: 'https://example.com/video2' },
            ],
            [
                { id: 0, title: 'Material 1', url: 'https://example.com/material1' },
                { id: 1, title: 'Material 2', url: 'https://example.com/material2' },
            ],
        ]
    },
    {
        id: 4, label: 'JAVA', labelImg: './learn/termux.png', content: [
            [
                { id: 0, title: 'Video 1', url: 'https://example.com/video1' },
                { id: 1, title: 'Video 2', url: 'https://example.com/video2' },
            ],
            [
                { id: 0, title: 'Material 1', url: 'https://example.com/material1' },
                { id: 1, title: 'Material 2', url: 'https://example.com/material2' },
            ],
        ]
    },

];

const Accordion: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const toggleShow = (id: number) => {
        setActiveTab(id);
    };

    return (
        <section className="accordion">
            <div className="accordion__tabs">
                {accordionItems.map((item) => (
                    <button
                        key={item.id}
                        className={`accordion__tab ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => toggleShow(item.id)}
                        data-actab-group="0"
                        data-actab-id={item.id}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className="accordion__content">
                {accordionItems.map((item) => (
                    <article
                        key={item.id}
                        className={`accordion__item ${activeTab === item.id ? 'active' : ''}`}
                        data-actab-group="0"
                        data-actab-id={item.id}
                    >
                        <div className="accordion__label" onClick={() => toggleShow(item.id)}>
                            <img src={item.labelImg} alt={item.label} />
                            <h3>{item.label}</h3>
                        </div>
                        <div className="accordion__container">
                            <div className="resources">
                                <div className="resource-group">
                                    <ul>
                                        {item.content[0].map((video) => (
                                            <li key={video.id}>
                                                <a href={video.url} target="_blank" rel="noopener noreferrer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" /></svg>
                                                    <h4>{video.title}</h4>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="resource-group">
                                    <ul>
                                        {item.content[1].map((material) => (
                                            <li key={material.id}>
                                                <a href={material.url} target="_blank" rel="noopener noreferrer">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" /></svg>
                                                    <h4>{material.title}</h4>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Accordion;
