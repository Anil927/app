'use client'
import React from 'react'
import '../page.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import './page.css'

const ResetPassword = () => {

    const [emailOrUserNameStatus, setemailOrUserNameStatus] = React.useState<string>('');
    const [isPasswordResetSuccessful, setIsPasswordResetSuccessful] = React.useState<boolean>(false);
    const [isResetChecked, setIsResetChecked] = React.useState<boolean>(true);

    const handleSubmit = (e: any) => {
        // submit logic here
        // check if email or username is valid
        const res = 'valid' // replace with actual response
        setemailOrUserNameStatus(res)
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsResetChecked(event.target.checked);
    };

    const handleVerify = (e: any) => {
        e.preventDefault()
        // verify logic here
        const res = 'success' // replace with actual response
        if (res === 'success') {
            setIsResetChecked(false)
        }
    }

    const router = useRouter()

    const handleReset = (e: any) => {
        // reset password logic here
        const res = 'success' // replace with actual response
        if (res === 'success') {
            setIsPasswordResetSuccessful(true)
        }
        setTimeout(() => {
            setIsPasswordResetSuccessful(false)
            router.push('/auth')
        }, 4000)
    }

    return (
        <div className='auth-container'>
            <input type="checkbox" id='reset-chk' aria-hidden="true" checked={isResetChecked}
                    onChange={handleCheckboxChange} />

            <div className="signup forgot-password">
                <form className="modal-container">
                    <div className="modal-header">
                        <div>Forgot Password</div>
                    </div>
                    <div className="modal-body">
                        {emailOrUserNameStatus === '' && <input type="text" placeholder='Email or Username' />}
                        {
                            emailOrUserNameStatus === 'valid' &&
                            <>
                                <div className="success-message">A verification code has been sent to your email</div>
                                <input type="text" placeholder='xxxxxx' style={{letterSpacing: '1px'}}/>
                            </>
                        }
                        {emailOrUserNameStatus === 'invalid' &&
                            <>
                                <div className="success-message">Invalid Email or User Name</div>
                                <input type="text" placeholder='Email or Username' />
                            </>
                        }
                    </div>
                    <div className="modal-footer">
                        {emailOrUserNameStatus === '' && <button className="submit-button" onClick={handleSubmit}>Submit</button>}
                        {emailOrUserNameStatus === 'valid' && <button className="submit-button" onClick={handleVerify}>Verify</button>}
                    </div>
                </form>
            </div>

            <div className="login reset-password">
                <form className="modal-container">
                    {
                        isPasswordResetSuccessful ?
                            <>
                                <div className="modal-body">
                                    <div className="success-message">Password reset successful</div>
                                </div>
                                <div className="modal-footer">
                                    <Link href='/auth'><button className="submit-button">Go to Login</button></Link>
                                </div>
                            </>
                            :
                            <>
                                <div className="modal-header">
                                    <div>Reset Password</div>
                                </div>
                                <div className="modal-body">
                                    <input type="password" placeholder='New Password' />
                                    <input type="password" placeholder='Confirm Password' />
                                </div>
                                <div className="modal-footer">
                                    <button className="submit-button" onClick={handleReset}>Reset</button>
                                </div>
                            </>
                    }
                </form>
            </div>
        </div>
    )
}

export default ResetPassword