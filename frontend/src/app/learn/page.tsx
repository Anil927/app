'use Client'
import React from 'react'
import styles from '../page.module.css'
import Accordion from './accordion/accordion'

const Learn = () => {
    return (
        <div className={styles.topBottomMargin}>
            {/* <div className="learn-section">
                <div className="termux">

                </div>
                <div className="python">

                </div>
                <div className="htmlcssjs">

                </div>
                <div className="git">

                </div>
                <div className="linux">
                
                </div>
                <div className="docker">

                </div>
                <div className="kubernetes">

                </div>
                <div className="aws">

                </div>
                <div className="java">

                </div>
                <div className="kotlin">

                </div>
            </div> */}
            <Accordion />
        </div>
    )
}

export default Learn
