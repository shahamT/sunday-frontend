import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { MainLogo } from '../app/header/WMLogo'
import { MondayMainLogo } from './MondayMainLogo'

export function LandPageHeader(props) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <header className="LandPageHeader">
                    <MondayMainLogo />
                <nav className="land-page-nav">
                    <NavLink to="/reusables" >Reusables</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/login" >Login</NavLink>
                    <NavLink to="/app" >App</NavLink>
                </nav>
        </header>
    )
}
