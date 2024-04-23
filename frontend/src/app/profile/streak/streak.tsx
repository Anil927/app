'use client'
import React, { useState } from 'react';
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, endOfMonth, getDay } from 'date-fns';
import './streak.css';

const Streak: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePrevMonth = () => {
        setCurrentDate(prevDate => subMonths(prevDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => addMonths(prevDate, 1));
    };

    const renderDays = () => {
        const days = [];
        const startDay = getDay(startOfMonth(currentDate));
        const totalDays = getDaysInMonth(currentDate);

        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty-day"></div>);
        }

        for (let i = 1; i <= totalDays; i++) {
            days.push(<div key={i} className="day">{i}</div>);
        }

        return days;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>Prev</button>
                <div>{format(currentDate, 'MMMM yyyy')}</div>
                <button onClick={handleNextMonth}>Next</button>
            </div>
            <div className="calendar-body">
                <div className="days-header">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <div className="days-grid">{renderDays()}</div>
            </div>
        </div>
    );
};

export default Streak;
