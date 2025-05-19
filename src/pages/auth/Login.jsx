// === Libs
import validator from 'validator';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useGoogleLogin } from '@react-oauth/google';

// === Services

// === Actions

// === Hooks / React
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { userService } from '../../services/user/index.js'
import { useState } from 'react'
import { useControlledForm } from '../../hooks/useControlledForm.js'
import { showErrorMsg } from '../../services/base/event-bus.service.js';
import { login } from '../../store/actions/user.actions.js';

// === Imgs

// === Child Components

// ====== Component ======
// =======================



export function Login() {
    // === Consts
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation();

    const validators = {
        email: value => {
            if (!validator.isEmail(value)) return 'Invalid email';
            return '';
        },

        password: value => {
            if (!value) return 'Password is required';
            if (value.length < 8) return 'Password must be at least 8 characters';
            return '';
        },
    };

    const [
        userCredentials,
        handleChange,
        resetForm,
        errors,
        validateField,
        validateAll
    ] = useControlledForm({ email: '', password: '' })

    // === Effects

    // === Functions

    function handleBlur(e) {
        validateField(e.target.name);
    }

    function onSubmit(e) {
        e.preventDefault();
        onLogin()
    }


    async function onLogin() {
        try {
            const user = await login(userCredentials)

            //redirecting the user to where they tried to get in the app.
            const from = location.state?.from || '/app/home';
            navigate(from, { replace: true });

        } catch (err) {
            showErrorMsg(err)
        }
    }

    async function loginToDemoAccount() {
        const userCred = {
            email: "user1@company.com",
            password: "hashed_pw_1"
        }
        try {
            const user = await login(userCred) 
            navigate('/app/home')
        }
        catch (err) {
            showErrorMsg(err)
        }
    }




    return (
        <div className="Login">
            <div className="main-content">
                <div className="content-wraper">

                    <h1 className='title login-title'>Log in to your account</h1>

                    <form onSubmit={onSubmit} className='login-form'>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id='email'
                                name='email'
                                type="text"
                                placeholder='Enter your work email'
                                value={userCredentials.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id='password'
                                name='password'
                                type="password"
                                placeholder='Enter your password'
                                value={userCredentials.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>

                        <button
                            className='clickable filled size-40 full-width '
                        >Login</button>

                    </form>

                    <div className="divider">
                        <div className="line" />
                        <p>Or</p>
                        <div className="line" />
                    </div>

                    <div
                        className='google-auth-btn clickable clear full-width size-40'
                        onClick={() => signupWithGoogle()}
                    >
                        <img className='google-icon' src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747598560/Google__G__logo.svg_igbjrb.png" />
                        Continue with Google
                    </div>


                    <p className='terms-and-cond-text'>
                        Don't have an account yet? &nbsp;
                        <a href="/signup">Sign up</a>
                        <br />
                        <br />
                        Can't log in? &nbsp;
                        <a href="#">Visit our help center</a>
                    </p>

                </div>

                <div className="demo-account-popup animate__animated animate__slideInDown animate__delay-1s">
                    <p>In hurry? </p>

                    <a href="#"
                        onClick={loginToDemoAccount}
                    >Login to our demo account</a>
                </div>

            </div>

            <div className='signup-side-img-container'>
                <img className='side-img' src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747658656/login_qfkn8p.avif" />
            </div>



        </div >
    )
}
