'use client'
import React, { useEffect, useState } from 'react';
import './snackbar.css';

interface Props {
    message: string;
}

const Snackbar: React.FC<Props> = ({ message }) => {

    return (
        <div className='snackbar'>
            {message}
        </div>
    );
};

export default Snackbar;
