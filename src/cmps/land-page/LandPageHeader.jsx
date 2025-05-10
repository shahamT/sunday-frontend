import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { MainLogo } from '../app/header/WMLogo'
import { MondayMainLogo } from './MondayMainLogo'

export function LandPageHeader(props) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <header className="LandPageHeader">
            <div className="header-content">
                <MondayMainLogo />
                <nav className="land-page-nav">
                    <a href="https://vibe.monday.com/?path=/docs/components-icon--docs#icons-list">icons</a>
                    <NavLink to="/reusables" >Reusables</NavLink>
                    <NavLink to="/dev-page-1" >dev1</NavLink>
                    <NavLink to="/dev-page-1" >dev2</NavLink>
                    <NavLink to="/dev-page-1" >dev3</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/login" >Login</NavLink>
                    <NavLink to="/app" >App</NavLink>
                    <div className="clickable land-page primary full size-40 icon-end i-MoveArrowRightNarrow">Get Started</div>

                </nav>
            </div>
        </header>
    )
}
