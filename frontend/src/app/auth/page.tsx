import React from 'react'
import './page.css'
import Link from 'next/link'

const Auth = () => {
    return (
        <div className='auth-container'>
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div className="signup">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name="txt" placeholder="User name" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="number" name="broj" placeholder="Phone" required />
                        <input type="password" name="pswd" placeholder="Password" required />
                        <Link href="/home"> <button>Sign up</button> </Link>
                    </form>
                </div>

                <div className="login">
                    <form>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="password" name="pswd" placeholder="Password" required />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth