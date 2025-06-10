// === Libs
import validator from 'validator';
import { googleAuth, loginUser, signupUser } from '../../store/actions/user.actions.js';


// === Services

// === Actions

// === Hooks / React
import { useNavigate, useSearchParams } from 'react-router-dom'
import { userService } from '../../services/user/index.js'
import { useControlledForm } from '../../hooks/useControlledForm.js'

// === Imgs

// === Child Components
import { showErrorMsg } from '../../services/base/event-bus.service.js';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';



const GOOGLE_CLIENT_ID = '198663761522-osnjd48065j34p2k59162s0hg0trvvp9.apps.googleusercontent.com'

// ====== Component ======
// =======================

export function Signup() {
    // === Consts
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)


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

    useEffect(() => {
        if (user) navigate('/app/home')
    }, [user])

    // === Functions

    function handleBlur(e) {
        validateField(e.target.name);
    }

    function onSubmit(e) {
        e.preventDefault();
        if (!validateAll()) return;
        onSignup()
    }


    async function onSignup() {

        try {
            const user = await signupUser(userToEdit)
            console.log(user)
            navigate('/app/home')
        } catch (err) {
            // showErrorMsg(err)
        }

    }

    async function loginToDemoAccount() {
        const userCred = {
            email: "yair.cohen@gmail.com",
            password: "yair1234"
        }
        try {
            const user = await loginUser(userCred)
            navigate('/app/home')
            console.log('got here')

        }
        catch (err) {
            // showErrorMsg(err)
            console.log("err: ", err)
        }
    }

    // ======== google auth =======

    useEffect(() => {
        if (!window.google?.accounts?.id) {
            console.error('Google script not loaded')
            return
        }

        window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: async (response) => {
                const idToken = response.credential
                if (!idToken) {
                    showErrorMsg?.('Google authentication failed')
                    return
                }

                try {
                    await googleAuth({ idToken }) // Send token to backend
                    navigate('/app/home')
                } catch (err) {
                    console.error('Google login error:', err)
                    showErrorMsg?.(err.message || 'Login failed')
                }
            },
        })

        window.google.accounts.id.renderButton(
            document.getElementById('googleSignInDiv'),
            {
                theme: 'outline',
                size: 'large',
                text: 'signin_with',
                shape: 'rectangular',
            }
        )
    }, [])

    return (
        <div className="Signup">
            <div className="main-content">
                <div className="content-wraper">

                    <h1 className='title signup-title'>Welcome to sunday.com</h1>
                    <h2 className='subtitle'>Get started - it's free. No credit card needed.</h2>

                    <div id="googleSignInDiv"></div>


                    <div className="divider">
                        <div className="line" />
                        <p>Or</p>
                        <div className="line" />
                    </div>

                    <form onSubmit={onSubmit} className='signup-form'>
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
                        <a href="#">Terms of Service</a>
                        &nbsp;and&nbsp;
                        <a href="#">Privacy Policy</a>
                    </p>
                </div>

                <div className="demo-account-popup animate__animated animate__slideInDown animate__delay-1s">
                    <p>In hurry? </p>

                    <a href="#"
                        onClick={loginToDemoAccount}
                    >Login to our demo account</a>
                </div>

            </div>

            <div className="footer-text">
                Already have an account?
                &nbsp;<a href="/login">Log in</a>
            </div>

            <div className='signup-side-img-container'>
                <img className='side-img' src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747501342/welcome-to-sunday_jddg8e.avif" />
            </div>


        </div >
    )
}
