// === Libs

// === Services

// === Actions

// === Hooks / React
import { useNavigate, useSearchParams } from 'react-router-dom'
import { userService } from '../../services/user/index.js'
import { useState } from 'react'

// === Imgs

// === Child Components

// ====== Component ======
// =======================



export function Signup({ setLoggedinUser }) {
    // === Consts
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState(userService.getEmptyUser())

    // === Effects

    // === Functions


    function handleChange({ target }) {
        // const { name: field, value } = target
        // setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        // ev.preventDefault()
        // const formattedCredentials = {...credentials, username: credentials.username += '@snoogle.com'}
        // signup(credentials)
    }

    function signup(credentials) {
        // authService.signup(credentials)
        //     .then(user => {
        //         setLoggedinUser(user)
        //         showSuccessMsg('Signed in successfully')
        //         navigate('/home')
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         showErrorMsg(`Couldn't signup...`)
        //     })
    }


    return (
        <div className="Signup">
            <div className="signup-main-content">
                <div className="content-wraper">

                    <h1 className='title'>Welcome to monday.com</h1>
                    <h2 className='subtitle'>Get started - it's free. No credit card needed.</h2>

                    <button className='google-auth-btn' >Continue with Google</button>

                    <div className="divider">
                        <div className="line" />
                        <p>Or</p>
                        <div className="line" />
                    </div>

                    <form >
                        <div className="input-group">
                            <label htmlFor="email">email</label>
                            <input id='email' name='email' type="text" placeholder='name@colmpany.com' />
                            <p className='error-text'>error</p>

                        </div>
                        <input type="text" />

                    </form>

                    <button className='clickable filled size-40 full-width '>Continue</button>

                    <p className='terms-and-cond-text'>
                        By proceeding, you agree to the<br />
                        <a href="">Terms of Service</a>
                        <nbsp /> and <nbsp />
                        <a href="">Privacy Policy</a>
                    </p>
                </div>

            </div>

            <div className="footer-text">
                Already have an account?
                <nbsp /> <a href="">Log in</a>
            </div>

            <div className='signup-side-img-container'>
                <img className='side-img' src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747501342/welcome-to-sunday_jddg8e.avif" />
            </div>













            {/* <div className="auth-container">

                <img src="/assets/img/logo/sn-icon.png" alt="" className="logo" />

                <div className="title-container">
                    <h1 className="title">Create a SNoogle Account</h1>
                    <p className="subtitle">Enter your new email address</p>
                </div>

                <form className="signup-form auth-form" onSubmit={handleSubmit}>
                    <div className="email-input-wraper">
                        <input
                            className="username"
                            type="text"
                            name="username"
                            // value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>
                    <input
                        type="password"
                        name="password"
                        // value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="fullname"
                        // value={credentials.fullname}
                        placeholder="Full name"
                        onChange={handleChange}
                        required
                    />
                    <button className="submit-btn">Sign up</button>
                </form>

                <div className="btns">
                    <a href="#" onClick={() => setIsSignUp(isSignup => !isSignup)}>
                       
                    </a >
                </div>
            </div> */}

        </div >
    )
}
