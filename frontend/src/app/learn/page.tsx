'use Client'
import React from 'react'
import styles from '../page.module.css'
import Accordion from './accordion/accordion'

const Learn = () => {
    return (
        <div className={styles.topBottomMargin}>
            <Accordion />
        </div>
    )
}

export default Learn
