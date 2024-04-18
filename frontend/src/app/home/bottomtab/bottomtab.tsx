import React from 'react'
import './bottomtab.css'

const BottomTab = () => {
    return (
        <div className='main'>

            <ul>
                <li>
                    <input type="radio" name="item" id="one" defaultChecked />
                    <label htmlFor="one">
                        <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title /><path d="M18,5V3a1,1,0,0,0-2,0V5H8V3A1,1,0,0,0,6,3V5H2V21H22V5Zm2,14H4V7H20ZM9,10H7v2H9Zm4,0H11v2h2Zm4,0H15v2h2ZM9,14H7v2H9Zm4,0H11v2h2Zm4,0H15v2h2Z" /></svg>
                        <div>home</div>
                    </label>

                </li>
                <li>
                    <input type="radio" name="item" id="two" />
                    <label htmlFor="two">
                        <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title /><path d="M12,4a9,9,0,1,0,9,9A9,9,0,0,0,12,4Zm0,16a7,7,0,1,1,7-7A7,7,0,0,1,12,20ZM21.19,3.81A12.88,12.88,0,0,0,17.06,1l-.78,1.84a11.08,11.08,0,0,1,3.5,2.36,11.43,11.43,0,0,1,1.87,2.49l1.75-1A13.19,13.19,0,0,0,21.19,3.81Zm-13.47-1L6.94,1A12.88,12.88,0,0,0,2.81,3.81,13.19,13.19,0,0,0,.6,6.74l1.75,1A11.43,11.43,0,0,1,4.22,5.22,11.08,11.08,0,0,1,7.72,2.86ZM13,8H11v6h5V12H13Z" /></svg>
                        <div>learn</div></label>

                </li>
                <li>
                    <input type="radio" name="item" id="three" />
                    <label htmlFor="three">
                        <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title /><path d="M19,6.76V2H6V6.76A4,4,0,0,0,7.17,9.59L9.59,12,7.17,14.41A4.06,4.06,0,0,0,6,17.24V22H19V17.24a4.06,4.06,0,0,0-1.17-2.83L15.41,12l2.42-2.41A4,4,0,0,0,19,6.76ZM17,20H8V17.24A2,2,0,0,1,8.45,16h8.1A2,2,0,0,1,17,17.24ZM17,6.76a2,2,0,0,1-.59,1.41l-2.76,2.77a1.5,1.5,0,0,0,0,2.12l.94.94H10.41l.94-.94a1.5,1.5,0,0,0,0-2.12L8.59,8.17A2,2,0,0,1,8,6.76V4h9Z" /></svg>
                        <div>code</div></label>

                </li>
                <li>
                    <input type="radio" name="item" id="four" />
                    <label htmlFor="four">
                        <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title /><path d="M22,11V7.83L12,2.06,2,7.83V11H4v8H2v2H22V19H20V11ZM4,9l8-4.62L20,9H4ZM6,19V11H8v8Zm4,0V11h4v8Zm8,0H16V11h2Z" /></svg>
                        <div>qna</div></label>

                </li>
                <li>
                    <input type="radio" name="item" id="five" />
                    <label htmlFor="five">
                        <svg viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title /><path d="M19.2,8h-3l.38-.14a3.29,3.29,0,0,0,1.1-5.47,3.28,3.28,0,0,0-5.38,1.47L12,5l-.33-1.12A3.27,3.27,0,0,0,5.32,5.43,3.25,3.25,0,0,0,7.38,7.86L7.77,8h-3A2.81,2.81,0,0,0,2,10.8v8.4A2.81,2.81,0,0,0,4.8,22H19.2A2.81,2.81,0,0,0,22,19.2V10.8A2.81,2.81,0,0,0,19.2,8ZM14.25,4.43a1.23,1.23,0,0,1,.88-.87,1.1,1.1,0,0,1,.35-.05A1.27,1.27,0,0,1,16.72,5a1.24,1.24,0,0,1-.8.94l-2.39.89ZM7.28,5A1.27,1.27,0,0,1,8.52,3.51a1.1,1.1,0,0,1,.35.05,1.23,1.23,0,0,1,.88.87l.72,2.44L8.08,6A1.24,1.24,0,0,1,7.28,5ZM20,19.2a.8.8,0,0,1-.8.8H4.8a.8.8,0,0,1-.8-.8V14H20ZM20,12H4V10.8a.8.8,0,0,1,.8-.8H19.2a.8.8,0,0,1,.8.8Z" /></svg>
                        <div>profile</div></label>

                </li>
            </ul>
        </div>
    )
}

export default BottomTab
