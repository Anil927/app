'use client'
import React, { useState, useEffect, useRef } from 'react'
import './sidenav.css'
import BottomTab from '../bottomtab/bottomtab'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

const SideNav = () => {
    const router = useRouter()
    const pathName = usePathname()
    const drawerRef = useRef(null);

    const [drawerOpen, setDrawerOpen] = useState(false);

    let pageHeadingName = '';
    if (pathName === '/home') {
        pageHeadingName = 'Home';
    } else if (pathName === '/learn') {
        pageHeadingName = 'Learn';
    } else if (pathName === '/code') {
        pageHeadingName = 'Code';
    } else if (pathName === '/discuss') {
        pageHeadingName = 'Discuss';
    } else if (pathName === '/profile') {
        pageHeadingName = 'Profile';
    }

    const [pageHeading, setPageHeading] = useState(pageHeadingName)

    const handleTabChange = async (e: any) => {
        if (e === 'one' && pathName !== '/home/createpost') {
            setPageHeading('Home')
            router.push('/home')
        } else if (e === 'two') {
            setPageHeading("Learn")
            router.push('/learn')
        } else if (e === 'three' && pathName !== '/code/codearea') {
            setPageHeading("Code")
            router.push('/code')
        } else if (e === 'four' && pathName !== '/discuss/ask' && pathName !== '/discuss/question') {
            setPageHeading("Discuss")
            router.push('/discuss')
        } else if (e === 'five' && pathName !== '/profile/useractivity' && pathName !== '/profile/userdownloads') {
            setPageHeading("Profile")
            router.push('/profile')
        }
    }


    const handleGoBack = () => {
        router.back();
    }


    useEffect(() => {

        const arrowSymbol = '<div class="small-arrow">\u276F</div>'; // Non-breaking space + heavy right-pointing angle quotation mark + Non-breaking space

        if (pathName.includes('/createpost')) {
            setPageHeading(`<div>Home</div>${arrowSymbol}<div>Create Post</div>`);
        } else if (pathName.includes('/codearea')) {
            setPageHeading(`<div>Code</div>${arrowSymbol}<div>Code Area</div>`);
        } else if (pathName.includes('/ask')) {
            setPageHeading(`<div>Discuss</div>${arrowSymbol}<div>Ask</div>`);
        } else if (pathName.includes('/question')) {
            setPageHeading(`<div>Discuss</div>${arrowSymbol}<div>Question</div>`);
        } else if (pathName.includes('/useractivity')) {
            setPageHeading(`<div>Profile</div>${arrowSymbol}<div>Activity</div>`);
        } else if (pathName.includes('/userdownloads')) {
            setPageHeading(`<div>Profile</div>${arrowSymbol}<div>Bookmarks</div>`);
        } else if (pathName.includes('/home')) {
            setPageHeading('Home');
        } else if (pathName.includes('/learn')) {
            setPageHeading('Learn');
        } else if (pathName.includes('/code')) {
            setPageHeading('Code');
        } else if (pathName.includes('/discuss')) {
            setPageHeading('Discuss');
        } else if (pathName.includes('/profile')) {
            setPageHeading('Profile');
        }
    }, [pathName]);



    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    const closeDrawer = (e: MouseEvent) => {
        if (drawerRef.current && !(drawerRef.current as HTMLElement).contains(e.target as Node)) {
            setDrawerOpen(false);
        }
    }

    const handlePopState = () => {
        setDrawerOpen(false);
    }

    useEffect(() => {
        if (drawerOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('click', closeDrawer);
            window.history.pushState(null, '', window.location.href);
            window.addEventListener('popstate', handlePopState);
        } else {
            document.body.style.overflow = 'auto';
            document.removeEventListener('click', closeDrawer);
            window.removeEventListener('popstate', handlePopState);
        }
        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('click', closeDrawer);
            window.removeEventListener('popstate', handlePopState);
        }
    }, [drawerOpen]);

    const userName = 'John Doe'; // Get username from backend or localstorage

    return (
        <div>
            <div className="top-navbar"></div>

            {
                (((pathName.match(/\//g) || []).length) === 1) && 
                <a id="nav-expand" onClick={toggleDrawer}>
                    <span style={{ marginBottom: '-7px' }}>
                        <Image src='/home/hamburger-home.svg' alt='Menu' width={20} height={20} />
                    </span>
                </a>
            }


            {
                (((pathName.match(/\//g) || []).length) > 1) && 
                <a id="go-back" onClick={handleGoBack}>
                    <span>
                        <Image src='/home/arrow-left.svg' alt='Back' width={16} height={16} /> 
                    </span>
                </a>
            }
            <div className="nav-heading" >
                <div dangerouslySetInnerHTML={{ __html: pageHeading }}></div>
            </div>
            <nav ref={drawerRef} id='drawer' className={drawerOpen ? 'active' : ''}>
                <a id="nav-collapse" onClick={toggleDrawer}>
                    <Image src='/home/chevron-left.svg' alt='Menu' width={25} height={25} />
                </a>
                <div className="drawer-profile-image">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" />
                    <div>{userName}</div>
                </div>
                <div className="drawer-buttons">
                    <button className="settings-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#8b9093" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg>Settings</button>
                    <button className="about-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#8b9093" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>About us</button>
                    <button className="logout-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#8b9093" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>Logout</button>
                </div>
            </nav>
            {drawerOpen && <div className="backdrop active" onClick={toggleDrawer}></div>}
            <div className="bottom-tab" >
                <BottomTab handleTabChange={handleTabChange} />
            </div>
        </div>
    )
}

export default SideNav
