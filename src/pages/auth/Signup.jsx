// === Libs
import validator from 'validator';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useGoogleLogin } from '@react-oauth/google';

// === Services

// === Actions

// === Hooks / React
import { useNavigate, useSearchParams } from 'react-router-dom'
import { userService } from '../../services/user/index.js'
import { useState } from 'react'
import { useControlledForm } from '../../hooks/useControlledForm.js'

// === Imgs

// === Child Components

// ====== Component ======
// =======================



export function Signup({ setLoggedinUser }) {
    // === Consts
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const validators = {
        email: value => {
            if (!value) return 'Email is required';
            if (!validator.isEmail(value)) return 'Invalid email';
            return '';
        },

        firstName: value => {
            if (!value) return 'First name is required';
            if (value.length < 2) return 'First name too short';
            if (!/^[A-Za-z\u0590-\u05FF]+$/.test(value)) return 'Only letters allowed';
            return '';
        },

        lastName: value => {
            if (!value) return 'Last name is required';
            if (value.length < 2) return 'Last name too short';
            if (!/^[A-Za-z\u0590-\u05FF]+$/.test(value)) return 'Only letters allowed';
            return '';
        },

        password: value => {
            if (!value) return 'Password is required';
            if (value.length < 8) return 'Password must be at least 8 characters';
            return '';
        },
    };

    const [
        userToEdit,
        handleChange,
        resetForm,
        errors,
        validateField,
        validateAll
    ] = useControlledForm(userService.getEmptyUser(), validators)

    // === Effects

    // === Functions

    function handleBlur(e) {
        validateField(e.target.name);
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!validateAll()) return;
        signup()
    }


    async function signup() {

        try {
            authService.signup(userToEdit)
            setLoggedinUser(user)
            navigate('/app/home')
        } catch (err) {
            showErrorMsg(err)
        }

    }


    const signupWithGoogle = useGoogleLogin({
        onSuccess: async (response) => {
            const idToken = response.credential;

            const decoded = jwtDecode(idToken);

            const email = decoded.email;
            const firstName = decoded.given_name;
            const lastName = decoded.family_name;
            const picture = decoded.picture;

            console.log('Google user:', { email, firstName, lastName, picture });

            // You can now send this info or the token to your backend
        },
        flow: 'implicit',
    });


    return (
        <div className="Signup">
            <div className="signup-main-content">
                <div className="content-wraper">

                    <h1 className='title'>Welcome to sunday.com</h1>
                    <h2 className='subtitle'>Get started - it's free. No credit card needed.</h2>

                    <div
                        className='google-auth-btn clickable clear full-width size-40'
                        onClick={() => signupWithGoogle()}
                    >
                        <img className='google-icon' src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747598560/Google__G__logo.svg_igbjrb.png" />
                        Continue with Google
                    </div>

                    <div className="divider">
                        <div className="line" />
                        <p>Or</p>
                        <div className="line" />
                    </div>

                    <form onSubmit={onSubmit}>
                        <div className="input-group">
                            <label htmlFor="firstName">First name</label>
                            <input
                                id='firstName'
                                name='firstName'
                                type="text"
                                placeholder='Enter your first name'
                                value={userToEdit.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && <p className="error-text">{errors.firstName}</p>}

                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                id='lastName'
                                name='lastName'
                                type="text"
                                placeholder='Enter your last name'
                                value={userToEdit.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && <p className="error-text">{errors.lastName}</p>}
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id='email'
                                name='email'
                                type="text"
                                placeholder='name@colmpany.com'
                                value={userToEdit.email}
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
                                placeholder='Enter at least 8 characters'
                                value={userToEdit.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && <p className="error-text">{errors.password}</p>}
                        </div>

                        <button
                            className='clickable filled size-40 full-width '
                        >Sign up</button>

                    </form>


                    <p className='terms-and-cond-text'>
                        By proceeding, you agree to the<br />
                        <a href="">Terms of Service</a>
                        &nbsp; and &nbsp;
                        <a href="">Privacy Policy</a>
                    </p>
                </div>

            </div>

            <div className="footer-text">
                Already have an account?
                &nbsp; <a href="">Log in</a>
            </div>

            <div className='signup-side-img-container'>
                <img className='side-img' src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747501342/welcome-to-sunday_jddg8e.avif" />
            </div>


        </div >
    )
}
