'use client'
import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './../../page.module.css'
import './page.css'

const PostReadMore = () => {

    const searchParams = useSearchParams()
    const postContent = searchParams.get('content') ?? ''

    return (
        <div className={styles.topBottomMargin}>
            <div className="post-read-more">
                {postContent}
            </div>
        </div>
    )
}

const ReadMorePage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PostReadMore />
        </Suspense>
    )
}

export default ReadMorePage;