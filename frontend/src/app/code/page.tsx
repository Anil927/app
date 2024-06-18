"use client"
import React, { useState, useEffect } from 'react'
import './page.css'
import './searchbar.css'
import CodeListItem from '../../components/codelistitem/codelistitem'
import { useRouter } from 'next/navigation'
import CodeUplodModal from './codeuploadmodal/codeuploadmodal'
import Snackbar from '../../components/snackbar/snackbar'
import Image from 'next/image'

const Code = () => {
    const router = useRouter()

    const handleCodeListItemClick = (id: number, fileType: string) => {
        router.push(`/code/codearea?fileType=${fileType}&id=${id}`)
    }

    const codeListItemIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [isAdminToggleChecked, setIsAdminToggleChecked] = useState(false);
    const [showFileChooseSuccessMsg, setShowFileChooseSuccessMsg] = useState(false);
    const [showFileChooseErrorMsg, setShowFileChooseErrorMsg] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const handleOpenModal = (title: string) => {
        setTitle(title);
        setIsModalOpen(true);
        setIsAdminToggleChecked(false);
    };

    const handleCheckboxChange = () => {
        setIsAdminToggleChecked(!isAdminToggleChecked);
    };

    const handleCodePublish = (files: (File | null)[]) => {
        if (files[0]) {
            setShowFileChooseSuccessMsg(true);
            setTimeout(() => {
                setShowFileChooseSuccessMsg(false);
            }, 2000);
        } else {
            setShowFileChooseErrorMsg(true);
            setTimeout(() => {
                setShowFileChooseErrorMsg(false);
            }, 2000);
        }
        setIsModalOpen(false);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSearchCode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const search = (e.currentTarget as HTMLFormElement).search.value;
        console.log(search);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                if (scrollTop - lastScrollTop > 200) {
                    setShowSearchBar(false);
                    setLastScrollTop(scrollTop);
                }
            } else {
                // Scrolling up
                if (lastScrollTop - scrollTop > 200) {
                    setShowSearchBar(true);
                    setLastScrollTop(scrollTop);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return (
        <div style={{margin: '90px 0 54px 0'}}>
            <form id="search-bar" className={showSearchBar ? '' : 'hidden'} onSubmit={handleSearchCode} role="search">
                <input id="search" type="search" placeholder="Search..." required />
                <input id='reset' type="reset" value="x" alt="Clear the search form" />
                <button id='search-btn' type="submit">
                    <Image src="./code/search-code.svg" alt="Search" width={20} height={20} />
                </button>
            </form>

            <div className="floating-action-button">
                <div className="adminActions">
                    <input
                        type="checkbox"
                        name="adminToggle"
                        className="adminToggle"
                        checked={isAdminToggleChecked}
                        onChange={handleCheckboxChange}
                    />
                    <a className="adminButton" href="#" onClick={(e) => e.preventDefault()}>+</a>
                    <div className="adminButtons">
                        <a href="#" title="python" onClick={(e) => { e.preventDefault(); handleOpenModal(e.currentTarget.title) }}><img src="./code/python.svg" alt="python" /></a>
                        <a href="#" title="html" onClick={(e) => { e.preventDefault(); handleOpenModal(e.currentTarget.title) }}><img src="./code/html-5.svg" alt="html" /></a>
                        <a href="#" title="javascript" onClick={(e) => { e.preventDefault(); handleOpenModal(e.currentTarget.title) }}><img src="./code/javascript.svg" alt="javascript" /></a>
                    </div>
                </div>
            </div>

            <CodeUplodModal
                language={title}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onPublish={handleCodePublish}
            />

            {showFileChooseSuccessMsg && <Snackbar message="Code will be published soon" />}
            {showFileChooseErrorMsg && <Snackbar message="Failed. Try to publish again" />}

            <div className="code-list">
                {codeListItemIds.map((id) => (
                    <CodeListItem key={id} id={id} onClick={handleCodeListItemClick} />
                ))}
            </div>
        </div>
    )
}

export default Code
