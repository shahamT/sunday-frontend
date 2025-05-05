import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { MainLogo } from './reusables/main-logo/MainLogo'

export function AppHeader(props) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <header className="app-header">
                    <MainLogo />
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                </nav>
        </header>
    )
}
