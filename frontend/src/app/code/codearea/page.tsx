'use client'
import React from 'react'
import CodeArea from '@/app/components/codearea/codearea'
import styles from '../../page.module.css'
import { useSearchParams } from 'next/navigation'


export default function() {

    const searchParams = useSearchParams()
    const id = parseInt(searchParams.get('id') ?? '')
    const fileType = searchParams.get('fileType')

    return (
        <div className={styles.topBottomMargin}>
            <CodeArea id={id} fileType={fileType!} />
        </div>
    )
}