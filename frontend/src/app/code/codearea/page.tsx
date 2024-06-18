'use client'
import React, { Suspense } from 'react'
import styles from '../../page.module.css'
import CodeArea from '@/components/codearea/codearea'
import { useSearchParams } from 'next/navigation'


const CodeAreaPage: React.FC = () => {

    const searchParams = useSearchParams()
    const id = parseInt(searchParams.get('id') ?? '')
    const fileType = searchParams.get('fileType')

    return (

        <div className={styles.topBottomMargin}>
            <CodeArea id={id} fileType={fileType!} />
        </div>

    )
}



const CodeDisplayPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CodeAreaPage />
        </Suspense>
    )
}

export default CodeDisplayPage;