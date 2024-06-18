import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/pojoaque.css'
import './richtexteditor.css';
import DOMPurify from 'dompurify';


interface EditorProps {
    value: string;
    onPublish: (content: string, rawContent: string) => void;
}

const QuillEditor: React.FC<EditorProps> = ({ value, onPublish }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const [content, setContent] = useState<string>('');

    const handlePublishClick = () => {
        if (typeof window !== 'undefined' && quillRef.current) {
            // Sanitize the content before publishing
            const cleanContent = DOMPurify.sanitize(content);
            const template = document.createElement('template');
            template.innerHTML = cleanContent.trim();
            template.content.querySelectorAll('.ql-ui').forEach((el) => el.remove());
            quillRef.current.root.querySelectorAll('.ql-ui').forEach((el) => el.remove());
            onPublish(template.innerHTML, `<pre>${quillRef.current.root.innerHTML}</pre>` || '');
        }
    };

    const colors = ["#f52314", "#fc6405", "#fcf805", "#4bfc05", "#4bfc05", "#149ef1", "#000"];
    const backgroundColors = ["#f58e8e", "#eef79e", "#9ef7f4", "#a09ef7", "#fff"];

    const modules = React.useMemo(() => ({
        toolbar: [
            ["bold", "italic", { color: colors }, { background: backgroundColors }],
            [{ align: "justify" }, { list: "ordered" }],
            ["link", "image", "code-block"]
        ],
        syntax: {
            hljs: hljs
        }
    }), []);

    const handleTextChange = () => {
        if (typeof window !== 'undefined' && quillRef.current) {
            if (quillRef.current) {
                const root = quillRef.current.root;
                let content = root.innerHTML;

                // Create a temporary container to parse and modify the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = content;

                // Find all elements with the class 'ql-code-block-container'
                const codeBlocks = tempDiv.querySelectorAll('.ql-code-block-container');

                codeBlocks.forEach(codeBlock => {
                    // Create a new pre tag
                    const preTag = document.createElement('pre');
                    preTag.className = 'ql-syntax';
                    preTag.style.color = 'white';
                    preTag.style.backgroundColor = '#23241f';
                    preTag.style.width = '98%';
                    preTag.style.maxWidth = '35s0px';
                    preTag.style.maxHeight = '50vh';
                    preTag.style.overflow = 'auto';
                    preTag.style.padding = '0.5em';
                    preTag.style.borderRadius = '4px';
                    preTag.style.boxSizing = 'border-box';

                    // Append the code block to the pre tag
                    preTag.appendChild(codeBlock.cloneNode(true));

                    // Replace the original code block with the wrapped pre tag
                    codeBlock.parentNode?.replaceChild(preTag, codeBlock);
                });

                // Set the modified HTML to the state
                if (typeof window !== 'undefined') {
                    setContent("<div style='width: 98%; max-width: 350px; box-sizing: border-box; white-space: pre-wrap, word-wrap: break-word'>" + tempDiv.innerHTML + "</div>");
                }
            }
        }
    };



    useEffect(() => {
        if (editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: modules
            });

            // Set the initial content
            quillRef.current.clipboard.dangerouslyPasteHTML(value);

            quillRef.current.on('text-change', handleTextChange);

            if (typeof window !== 'undefined') {
                setTimeout(() => {
                    document.querySelectorAll('pre.ql-syntax').forEach((block) => {
                        hljs.highlightBlock(block as HTMLElement);
                    });
                }, 1000);
            }
        }

        return () => {
            if (quillRef.current) {
                quillRef.current.off('text-change', handleTextChange);
                quillRef.current = null;
            }
        };
    }, [modules]);

    return (
        <div className='editor-container'>
            <div className='editor' ref={editorRef} />
            <div className="publish-button-container">
                <button className='qna-publish-button' onClick={handlePublishClick}>Publish</button>
            </div>
        </div>
    );
};

export default QuillEditor;
