'use client'
import React, { useState } from 'react';
import UserCodes from './usercodes/usercodes'
import UserPosts from './userposts/userposts'
import UserQuestions from './userquestions/userquestions'
import UserAnswers from './useranswers/useranswers';
import './page.css';

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
                <div className='pre-tag-wrapper' style={{ marginTop: '56px' }}>
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
        <div style={{margin: '50px 0 46px 0'}}>
            <div className="user-activity tabs">
                <input
                    type="checkbox"
                    id="tab-0"
                    className="tab"
                    onChange={() => handleChange(0)}
                    checked={value === 0}
                />
                <label htmlFor="tab-0">Codes</label>

                <input
                    type="checkbox"
                    id="tab-1"
                    className="tab"
                    onChange={() => handleChange(1)}
                    checked={value === 1}
                />
                <label htmlFor="tab-1">Posts</label>

                <input
                    type="checkbox"
                    id="tab-2"
                    className="tab"
                    onChange={() => handleChange(2)}
                    checked={value === 2}
                />
                <label htmlFor="tab-2">Questions</label>

                <input
                    type="checkbox"
                    id="tab-3"
                    className="tab"
                    onChange={() => handleChange(3)}
                    checked={value === 3}
                />
                <label htmlFor="tab-3">Answers</label>

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
            <TabPanel value={value} index={3}>
                <UserAnswers />
            </TabPanel>
        </div>
    );
};

export default UserActivity;
