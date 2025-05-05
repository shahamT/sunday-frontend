// const { useState } = React
// const { useNavigate } = ReactRouter
// const {useSearchParams } = ReactRouterDOM

// import { showErrorMsg, showSuccessMsg } from '../services/base/event-bus.service.js'
// import { userService } from '../services/user.service.js'
// import { authService } from '../services/auth.service.js'


export function Signup({ setLoggedinUser }) {
    // const [searchParams] = useSearchParams()
    // const navigate = useNavigate()

    // const [credentials, setCredentials] = useState(userService.getEmptyCredentials())


    // function handleChange({ target }) {
    //     const { name: field, value } = target
    //     setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    // }

    // function handleSubmit(ev) {
    //     ev.preventDefault()
    //     const formattedCredentials = {...credentials, username: credentials.username += '@snoogle.com'}
    //     signup(credentials)
    // }

    // function signup(credentials) {
    //     authService.signup(credentials)
    //         .then(user => {
    //             setLoggedinUser(user)
    //             showSuccessMsg('Signed in successfully')
    //             navigate('/home')
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             showErrorMsg(`Couldn't signup...`)
    //         })
    // }

    // function onGoBack() {
    //     const from = searchParams.get('from')
    
    //     if (from) {
    //       navigate(from)
    //     } else {
    //       navigate('/home') 
    //     }
    //   }

    // return (
    //     <div className="signup auth-page ">
    //         <div className="auth-container">

    //         <button className="back-btn icon-btn big arrow-left" onClick={onGoBack}></button>

    //             <img src="/assets/img/logo/sn-icon.png" alt="" className="logo" />

    //             <div className="title-container">
    //                 <h1 className="title">Create a SNoogle Account</h1>
    //                 <p className="subtitle">Enter your new email address</p>
    //             </div>

    //             <form className="signup-form auth-form" onSubmit={handleSubmit}>
    //                 <div className="email-input-wraper">
    //                     <input
    //                         className="username"
    //                         type="text"
    //                         name="username"
    //                         value={credentials.username}
    //                         placeholder="Username"
    //                         onChange={handleChange}
    //                         required
    //                         autoFocus
    //                     />
    //                 </div>
    //                 <input
    //                     type="password"
    //                     name="password"
    //                     value={credentials.password}
    //                     placeholder="Password"
    //                     onChange={handleChange}
    //                     required
    //                     autoComplete="off"
    //                 />
    //                 <input
    //                     type="text"
    //                     name="fullname"
    //                     value={credentials.fullname}
    //                     placeholder="Full name"
    //                     onChange={handleChange}
    //                     required
    //                 />
    //                 <button className="submit-btn">Sign up</button>
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
