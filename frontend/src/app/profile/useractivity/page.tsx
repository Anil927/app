import React from 'react'
import styles from "@/app/page.module.css"
import './page.css'
import FeedPost from '@/app/components/feedpost/feedpost'
import UserCodes from './usercodes/usercodes'
import UserPosts from './userposts/userposts'
import UserQuestions from './userquestions/userquestions'

const UserActivity = () => {
    return (
        <div className={styles.topBottomMargin}>
            <div className="tab-wrap">

                <input type="radio" name="tabs" id="tab1" defaultChecked />
                <div className="tab-label-content" id="tab1-content">
                    <label htmlFor="tab1">Codes</label>
                    <div className="tab-content">
                        <UserCodes />
                    </div>
                </div>

                <input type="radio" name="tabs" id="tab2" />
                <div className="tab-label-content" id="tab2-content">
                    <label htmlFor="tab2">Posts</label>
                    <div className="tab-content">
                         <UserPosts />
                    </div>
                </div>

                <input type="radio" name="tabs" id="tab3" />
                <div className="tab-label-content" id="tab3-content">
                    <label htmlFor="tab3">Questions</label>
                    <div className="tab-content">
                        <UserQuestions />
                    </div>
                </div>

                <div className="slide"></div>

            </div>



        </div>
    )
}

export default UserActivity