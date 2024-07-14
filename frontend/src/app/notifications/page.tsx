'use client'

import React, { useEffect } from 'react'
import styles from '@/app/page.module.css'
import "./page.css"
import Image from 'next/image'

const Notification = () => {

    let notificationObjectArray;

    useEffect(() => {
        // fetch the notifications and store in notification object
    }, [])

    // for now, store dummy array of notifications
    notificationObjectArray = [
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
        {
            id: "2343d69d79f3",
            message: "Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk",
            extra: "extra"
        },
    ]

    return (
        <div className={styles.topBottomMargin}>
            {
                notificationObjectArray.map((notificationObject, index) => {
                    return <NotificationListItem key={index} notificationObject={notificationObject} />
                })
            }
        </div>
    )
}

export default Notification


interface NotificationListItemProps {
    notificationObject: Object
}

const NotificationListItem: React.FC<NotificationListItemProps> = ({ notificationObject }) => {

    // use the notification object to get all the data about the notification

    return (
        <div className='notification'>
            <div className="notification-profile-photo">
                <Image src="/code/html-5.svg" alt="profile" width={30} height={30} />
            </div>
            <div className="notification-content">
                <div className="message">Lorem ipsum dolor amet consutuor is hte ikcekteej joodryuk</div>
                <div className="extra">extra</div>
            </div>
        </div>
    )
}
