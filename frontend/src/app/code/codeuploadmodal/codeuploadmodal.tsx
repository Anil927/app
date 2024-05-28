// Modal.js
import React from 'react';
import './codeuploadmodal.css';

interface Props {
    language: string;
    isOpen: boolean;
    onClose: () => void;
    onPublish: (files: (File | null)[]) => void;
}

const Modal: React.FC<Props> = ({ language, isOpen, onClose, onPublish }) => {

    const [files, setFiles] = React.useState<(File | null)[]>([null, null, null]);

    React.useEffect(() => {
        // Freeze background
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Clean up on component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: any) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        const index = parseInt(e.target.id.split('-')[2]) - 1;
        const newFiles = [...files];
        newFiles[index] = file;
        setFiles(newFiles);
    };

    const handlePublishClick = () => {
        onPublish(files);
        setFiles([null, null, null])
    }

    let modalBody = null;

    if (language === 'python') {
        modalBody = <div className="file-input-container">
            <input
                type="file"
                accept=".py"
                id="file-input-1"
                className="file-input"
                onChange={handleFileChange}
            />
            <label htmlFor="file-input-2" className="file-input-label">
                <img src="./code/python.svg" alt="python" />
            </label>
        </div>
    } else if (language === 'javascript') {
        modalBody = <div className="file-input-container">
            <input
                type="file"
                accept=".js"
                id="file-input-1"
                className="file-input"
                onChange={handleFileChange}
            />
            <label htmlFor="file-input-2" className="file-input-label">
                <img src="./code/javascript.svg" alt="javascript" />
            </label>
        </div>
    } else if (language === 'html') {
        modalBody = <><div className="file-input-container">
            <input
                type="file"
                accept=".html,.htm"
                id="file-input-1"
                className="file-input"
                onChange={handleFileChange}
            />
            <label htmlFor="file-input-1" className="file-input-label">
                <img src="./code/html-5.svg" alt="html" />
            </label>
        </div>
            <div className="file-input-container">
                <input
                    type="file"
                    accept=".css"
                    id="file-input-2"
                    className="file-input"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-input-2" className="file-input-label">
                    <img src="./code/css3.svg" alt="css" />
                </label>
            </div>
            <div className="file-input-container">
                <input
                    type="file"
                    accept=".js"
                    id="file-input-3"
                    className="file-input"
                    onChange={handleFileChange}
                />
                <label htmlFor="file-input-3" className="file-input-label">
                    <img src="./code/javascript.svg" alt="javascript" />
                </label>
            </div></>
    }


    return (
        <>
            <div className="modal-overlay" onClick={(e) => handleOverlayClick(e)}>
                <div className="modal-container">
                    <div className="modal-header">
                        <div>Upload Code Files</div>
                        <button className="close-button-code-file-upload" onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill='#fff' d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg></button></div>
                    <div className="modal-body">
                        {modalBody}
                    </div>
                    <div className="modal-footer">
                        <button className="publish-button" onClick={handlePublishClick}>Publish</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
