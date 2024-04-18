import React from 'react'
import './sidenav.css'
import BottomTab from '../bottomtab/bottomtab'

const SideNav = () => {
    return (
        <div>
            <div className="top-navbar">
            </div>
            <a id="nav-expand" href="#">
                <span className="icon icon-menu"></span>&nbsp;
            </a>
            <div className="nav-heading">
                <span>Code</span>
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

            <main className='main-content'>
                {/* */}
            </main>

            <div className="bottom-tab">
                <BottomTab />
            </div>
        </div>
    )
}

export default SideNav
