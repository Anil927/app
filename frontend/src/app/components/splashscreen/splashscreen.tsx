'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './splashscreen.css'

const SplashScreen = () => {

    const router = useRouter();

    // Run the effect when the component mounts
    useEffect(() => {
        // Hide the component after 2 seconds
        const timer = setTimeout(() => {
            router.push('/auth');
        }, 500);

        // Clean up the timer when the component unmounts
        return () => {
            clearTimeout(timer);
        };
    }, []);


    return (
        <div>
            <h2>Welcome To</h2>
            <h1>CodeMe</h1>
        </div>
    )
}

export default SplashScreen
