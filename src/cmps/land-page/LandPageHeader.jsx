import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { MondayMainLogo } from './MondayMainLogo'
import { useEffect, useRef } from 'react'
import { AboutUs } from '../../pages/land-page/AboutUs'
import { openGlobalModal } from '../../store/actions/app.actions'
import { HamburgerIcon } from '../reusables/HamburgerIcon/HamburgerIcon'
import { useToggle } from '../../hooks/useToggle'

export function LandPageHeader(props) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const navigate = useNavigate()
    const headerRef = useRef();
    const sentinelRef = useRef();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useToggle(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                headerRef.current?.classList.toggle("sticked", !entry.isIntersecting);
            },
            {
                threshold: 0,
                rootMargin: `0px 0px 0px 0px`,
            }
        );

        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, []);



    return (
        <>
            <div className="land-page-header-sentinal" ref={sentinelRef} />
            <header ref={headerRef} className="LandPageHeader">
                <div className="header-content">
                    <MondayMainLogo />

                        <nav className={`land-page-nav ${isMobileMenuOpen ? 'opened' : ''}`}>
                            {/* <a href="https://vibe.monday.com/?path=/docs/components-icon--docs#icons-list">icons</a> */}
                            {/* <NavLink to="/reusables" >Reusables</NavLink>
                        <NavLink to="/dev-page-1" >dev1</NavLink>
                        <NavLink to="/dev-page-2" >dev2</NavLink>
                        <NavLink to="/dev-page-3" >dev3</NavLink> */}
                        <button to="/#" onClick={() => openGlobalModal(<AboutUs />)} >About us</button>
                        <NavLink to="/app/home" >Log in</NavLink>
                        <div
                            className="get-started-btn clickable land-page primary full size-40 icon-end i-MoveArrowRightNarrow"
                            onClick={() => navigate('/signup')}
                        >Get Started</div>

                        </nav>
                    <a className='mobile-menu-btn'
                        onClick={setIsMobileMenuOpen}
                    >
                        < HamburgerIcon
                            isOpen={isMobileMenuOpen}
                            onClick={setIsMobileMenuOpen}
                            color="#323338"
                            size={0.6}
                        />
                    </a>
                </div>
            </header>
        </>
    )
}
