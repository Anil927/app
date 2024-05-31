import React, { useEffect, useRef } from 'react';
import './questionformat.css';
import RichTextEditor from '../richtexteditor/richtexteditor';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css'; // Choose a style you prefer

interface QuestionProps {
    id: number;
}

const QuestionFormat: React.FC<QuestionProps> = ({ id }) => {
    const [editorContent, setEditorContent] = React.useState('');
    const [published, setPublished] = React.useState(false);
    const publishedContentRef = useRef<HTMLDivElement | null>(null);

    const handlePublish = (content: string) => {
        setEditorContent(content);
    };

    const handlePublishClick = () => {
        setPublished(true);
    };

    useEffect(() => {
        if (published && publishedContentRef.current) {
            publishedContentRef.current.querySelectorAll('pre').forEach((block: Element) => {
                hljs.highlightElement(block as HTMLElement);
                (block as HTMLElement).style.width = '100%';
                (block as HTMLElement).style.overflow = 'auto';
                (block as HTMLElement).style.padding = '0.5em';
            });
        }
    }, [editorContent]);

    return (
        <div>
            <RichTextEditor value='' onPublish={handlePublish} />
            <button onClick={handlePublishClick}>Publish</button>
            <div>
                {published && (
                    <div
                        ref={publishedContentRef}
                        dangerouslySetInnerHTML={{ __html: editorContent }}
                    ></div>
                )}
            </div>
        </div>
    );
};

export default QuestionFormat;
