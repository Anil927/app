'use client'
import React, { useState, useEffect } from 'react'
import './sidenav.css'
import BottomTab from '../bottomtab/bottomtab'

import { useRouter, usePathname } from 'next/navigation'

const SideNav = () => {

    const router = useRouter()
    const pathName = usePathname()

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
        if (e === 'one') {
            setPageHeading('Home')
            router.push('/home')
        } else if (e === 'two') {
            setPageHeading("Learn")
            router.push('/learn')
        } else if (e === 'three') {
            setPageHeading("Code")
            router.push('/code')
        } else if (e === 'four') {
            setPageHeading("Discuss")
            router.push('/discuss')
        } else if (e === 'five') {
            setPageHeading("Profile")
            router.push('/profile')
        }
    }

    // when the user presses back button in the browser, the pathName changes and the page heading should be updated accordingly
    useEffect(() => {
        if (pathName === '/home') {
            setPageHeading('Home');
        } else if (pathName === '/learn') {
            setPageHeading('Learn');
        }else if (pathName === '/code') {
            setPageHeading('Code');
        }else if (pathName === '/discuss') {
            setPageHeading('Discuss');
        }else if (pathName === '/profile') {
            setPageHeading('Profile');
        }
    }, [pathName])





    return (
        <div>
            <div className="top-navbar">
            </div>
            <a id="nav-expand" href="#">
                <span className="icon icon-menu"></span>&nbsp;
            </a>
            <div className="nav-heading">
                <span>{pageHeading}</span>
            </div>
            <nav>
                <a id="nav-collapse" href="#">
                    <span className="icon icon-cross"></span>
                </a>
                <a href="#">Home</a>
                <a href="#">Services</a>
                <a href="#">Portfolio</a>
                <a href="#">About</a>
            </nav>

            <div className="bottom-tab">
                <BottomTab handleTabChange={handleTabChange} />
            </div>
        </div>
    )
}

export default SideNav
