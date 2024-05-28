'use client'

import React, { useState } from 'react';
import styles from "@/app/page.module.css"
import './page.css'
import UserCodes from './usercodes/usercodes'
import UserPosts from './userposts/userposts'
import UserQuestions from './userquestions/userquestions'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div
            style={{ overflow: 'auto' }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            className='tabpanel'
        >
            {value === index && (
                <div className='pre-tag-wrapper' style={{ marginTop: '56px'}}>
                    {children}
                </div>
            )}
        </div>
    );
};

const UserActivity: React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (index: number) => {
        setValue(index);
    };

    return (
        <div className={styles.topBottomMargin}>
            <div className="tabs">
                <button className={value === 0 ? 'tab active' : 'tab'} onClick={() => handleChange(0)}>Codes</button>
                <button className={value === 1 ? 'tab active' : 'tab'} onClick={() => handleChange(1)}>Posts</button>
                <button className={value === 2 ? 'tab active' : 'tab'} onClick={() => handleChange(2)}>Questions</button>
                <div className="slider-useractivity"></div>
            </div>
            <TabPanel value={value} index={0}>
                <UserCodes />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserPosts />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <UserQuestions />
            </TabPanel>
        </div>
    );
};

export default UserActivity;
