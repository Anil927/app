import React, { useState, useEffect } from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import './richtexteditor.css';
import DOMPurify from "dompurify";

interface EditorProps {
    value: string;
    onPublish: (content: string) => void;
}

const RichTextEditor: React.FC<EditorProps> = ({ value, onPublish }) => {
    const [editorContent, setEditorContent] = useState(value);

    const handleChange = (content: any) => {
        setEditorContent(content);
    };

    useEffect(() => {
        // sanitize the content and highlight the code blocks
        const cleanContent = DOMPurify.sanitize(editorContent);
        const template = document.createElement('template');
        template.innerHTML = cleanContent.trim();

        if (template.content.firstChild) {
            template.content.querySelectorAll('pre').forEach((block: Element) => {
                hljs.highlightElement(block as HTMLElement);
                (block as HTMLElement).style.width = '100%';
                (block as HTMLElement).style.overflow = 'auto';
                (block as HTMLElement).style.padding = '0.5em';
            });
        }

        onPublish(editorContent);
    }, [onPublish]);

    hljs.configure({
        languages: ['javascript', 'python', 'html', 'css'],
    });

    const colors = ["#f52314", "#fc6405", "#fcf805", "#4bfc05", "#4bfc05", "#149ef1", "#000"];
    const backgroundColors = ["#f58e8e", "#eef79e", "#9ef7f4", "#a09ef7", "#fff"];

    const modules = React.useMemo(() => ({
        toolbar: [
            ["bold", "italic", { color: colors }, { background: backgroundColors }],
            [{ align: "justify" }, { list: "ordered" }, { list: "bullet" }],
            ["link", "image", "code-block"]
        ],
        syntax: {
            highlight: (text: any) => hljs.highlightAuto(text).value,
        },
    }), []);

    const formats = [
        "bold",
        "italic",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align",
        "code-block"
    ];

    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={editorContent}
            onChange={handleChange}
        />
    );
}

export default RichTextEditor;
