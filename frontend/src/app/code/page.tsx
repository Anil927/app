"use client"
import React from 'react'
import './page.css'
import styles from '../page.module.css'
import CodeListItem from '../components/codelistitem/codelistitem'
import { useRouter } from 'next/navigation'
import CodeUplodModal from './codeuploadmodal/codeuploadmodal'
import Snackbar from '../components/snackbar/snackbar'

const Code = () => {

    const router = useRouter()

    const handleCodeListItemClick = (id: number, fileType: string) => {
        router.push(`/code/codearea?fileType=${fileType}&id=${id}`)
    }

    const codeListItemIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] // Dummy data for now, this needs to be fetched from the backend

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [isAdminToggleChecked, setIsAdminToggleChecked] = React.useState(false);
    const [showFileChooseSuccessMsg, setShowFileChooseSuccessMsg] = React.useState(false);
    const [showFileChooseErrorMsg, setShowFileChooseErrorMsg] = React.useState(false);
    // const [uploadStatus, setUploadStatus] = React.useState(false); // To show the success or error message after file upload

    const handleOpenModal = (title: string) => {
        setTitle(title);
        setIsModalOpen(true);
        setIsAdminToggleChecked(false);
    };

    const handleCheckboxChange = () => {
        setIsAdminToggleChecked(!isAdminToggleChecked);
    };

    const handleCodePublish = (files: (File | null)[]) => {
        // Perform the file upload logic here
        if (files[0]) {
            setShowFileChooseSuccessMsg(true);
            setTimeout(() => {
                setShowFileChooseSuccessMsg(false);
            }, 2000);
            // API call to upload the file
        } else {
            setShowFileChooseErrorMsg(true);
            setTimeout(() => {
                setShowFileChooseErrorMsg(false);
            }, 2000);
        }
        setIsModalOpen(false); // Close the modal after successful upload
    };

    const handleCloseModal = () => setIsModalOpen(false);


    return (
        <div className={styles.topBottomMargin}>

            {/* For floating action button */}
            <div className="floating-action-button">
                <div className="adminActions">
                    <input
                        type="checkbox"
                        name="adminToggle"
                        className="adminToggle"
                        checked={isAdminToggleChecked}
                        onChange={handleCheckboxChange}
                    />
                    <a className="adminButton" href="#!"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg></a>
                    <div className="adminButtons">
                        <a href="#" title="python" onClick={(e) => { e.preventDefault(); handleOpenModal(e.currentTarget.title) }}><img src="./code/python.svg" alt="python" /></a>
                        <a href="#" title="html" onClick={(e) => { e.preventDefault(); handleOpenModal(e.currentTarget.title) }}><img src="./code/html-5.svg" alt="html" /></a>
                        <a href="#" title="javascript" onClick={(e) => { e.preventDefault(); handleOpenModal(e.currentTarget.title) }}><img src="./code/javascript.svg" alt="javascript" /></a>
                    </div>
                </div>
            </div>

            {/* For modal */}
            <CodeUplodModal
                language={title}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onPublish={handleCodePublish}
            />

            {/* For success message */}
            {showFileChooseSuccessMsg && <Snackbar message="Code will be published soon" />}

            {/* For error message */}
            {showFileChooseErrorMsg && <Snackbar message="Failed. Try to publish again" />}


            {/* For code list items */}
            <div className="code-list">
                {codeListItemIds.map((id) => {
                    return (
                        <CodeListItem key={id} id={id} onClick={handleCodeListItemClick} />
                    )
                })}
            </div>

        </div>
    )
}

export default Code
