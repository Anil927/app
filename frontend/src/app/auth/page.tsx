'use client'
import React from 'react'
import './page.css'
import Link from 'next/link'

const Auth = () => {

    const handleSubmit = (e: any) => {
        // e.preventDefault()
        console.log('submit')
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
                        <input type="text" placeholder='Your Full Name' />
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='New Password' />
                        <input type="password" placeholder='Confirm Password' />
                        <input type="number" placeholder='Phone Number' />
                    </div>
                    <div className="modal-footer">
                        <Link href='/home'><button className="submit-button" onClick={handleSubmit}>Register</button></Link>
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
                        <Link href='/auth/resetpassword'><span style={{color: '#139ef1', fontSize: '0.8em'}}>Forgot Password ?</span></Link>
                    </div>
                    <div className="modal-footer">
                        <button className="submit-button" onClick={handleSubmit}>Login</button>
                        <span>Don&apos;t have an account ? <label htmlFor='chk'>Sign up</label></span>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Auth