'use Client'
import React from 'react'
import styles from '../page.module.css'
import Accordion from './accordion/accordion'

const Learn = () => {
    return (
        <div className={styles.topBottomMargin} style={{backgroundColor: "rgba(26, 25, 25, 0.95)"}}>
            <Accordion />
        </div>
    )
}

export default Learn
