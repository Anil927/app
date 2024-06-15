'use client'
import React from 'react'
import './page.css'

const Auth = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    return (
        <div className='auth-container'>
            <input type="checkbox" id="chk" aria-hidden="true"/>

            <div className="signup">
                <form className="modal-container">
                    <div className="modal-header">
                        <div>Register</div>
                    </div>
                    <div className="modal-body">
                        <input type="text" placeholder='Your Name' />
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                        <input type="password" placeholder='Confirm Password' />
                        <input type="number" placeholder='Phone Number' />
                    </div>
                    <div className="modal-footer">
                        <button className="submit-button" onClick={handleSubmit}>Register</button>
                        <span>Already have an account ? <label htmlFor='chk'>Sign in</label></span>
                    </div>
                </form>
            </div>

            <div className="login">
                <form className="modal-container">
                    <div className="modal-header">
                        <div>Login</div>
                    </div>
                    <div className="modal-body">
                        <input type="text" placeholder='User Name or Email' />
                        <input type="password" placeholder='Password' />
                    </div>
                    <div className="modal-footer">
                        <button className="submit-button" onClick={handleSubmit}>Login</button>
                        <span>Don't have an account ? <label htmlFor='chk'>Sign up</label></span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Auth