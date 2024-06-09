"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import CodeListItem from '@/app/components/codelistitem/codelistitem'


const Code = () => {

    const router = useRouter()

    const handleCodeListItemClick = (id: number, fileType: string) => {
        router.push(`/code/codearea?fileType=${fileType}&id=${id}`)
    }

    const codeListItemIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] // Dummy data for now, this needs to be fetched from the backend


    return (
        <div>
            {/* For code list items */}
            <div style={{ textDecoration: 'none'}}>
                {codeListItemIds.map((id) => {
                    return (
                        <CodeListItem key={id} id={id} onClick={handleCodeListItemClick} />
                    )
                })}
            </div>
        </div>
    )
}

export default Code
