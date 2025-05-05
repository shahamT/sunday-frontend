// const { useState } = React
// const { useNavigate } = ReactRouter
// const {useSearchParams } = ReactRouterDOM


// import { authService } from '../services/base/auth.service.js'
// import { showErrorMsg, showSuccessMsg } from '../services/base/event-bus.service.js'
// import { userService } from '../services/user.service.js'


export function Login({ setLoggedinUser }) {
    // const [searchParams] = useSearchParams()
    // const navigate = useNavigate()

    // const [credentials, setCredentials] = useState(userService.getEmptyCredentials())


    // function handleChange({ target }) {
    //     const { name: field, value } = target
    //     setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    // }

    // function handleSubmit(ev) {
    //     ev.preventDefault()
    //     login(credentials)
    // }

    // function login(credentials) {
    //     authService.login(credentials)
    //         .then(user => {
    //             setLoggedinUser(user)
    //             showSuccessMsg('Logged in successfully')
    //             onGoBack()
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             showErrorMsg(`Couldn't login...`)
    //         })
    // }

    // function onGoBack() {
    //     const from = searchParams.get('from')

    //     if (from) {
    //         navigate(from)
    //     } else {
    //         navigate('/home')
    //     }
    // }

    // return (
    //     <div className="login auth-page">
    //         <div className="auth-container">

    //             <button className="back-btn icon-btn big arrow-left" onClick={onGoBack}></button>

    //             <img src="/assets/img/logo/sn-icon.png" alt="" className="logo" />

    //             <div className="title-container">
    //                 <h1 className="title">Log in</h1>
    //                 <p className="subtitle">Use your snoogle email address</p>
    //             </div>

    //             <form className="login-form auth-form" onSubmit={handleSubmit}>
    //                 <input
    //                     type="text"
    //                     name="username"
    //                     value={credentials.username}
    //                     placeholder="Username"
    //                     onChange={handleChange}
    //                     required
    //                     autoFocus
    //                 />
    //                 <input
    //                     type="password"
    //                     name="password"
    //                     value={credentials.password}
    //                     placeholder="Password"
    //                     onChange={handleChange}
    //                     required
    //                     autoComplete="off"
    //                 />

    //                 <button className="submit-btn">Login</button>
    //             </form>

    //             <div className="btns">
    //                 <a href="#" onClick={() => setIsSignUp(isSignup => !isSignup)}>
    //                     {/* {isSignup ?
    //                     'Already a member? Login' :
    //                     'New user? Signup here'
    //                 } */}
    //                 </a >
    //             </div>
    //         </div>
    //     </div >
    // )
}
