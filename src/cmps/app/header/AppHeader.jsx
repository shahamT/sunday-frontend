import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { MainLogo } from './WMLogo'
import { Tooltip } from '../../reusables/tooltip/Tooltip'
import { PopUpMenu } from '../../reusables/PopUpMenu/PopUpMenu'
import { logout } from '../../../store/actions/user.actions'

export function AppHeader(props) {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)


    const profileImg = user?.profileImg || "https://res.cloudinary.com/dqaq55tup/image/upload/v1746718601/default_user_photo_ak7mer.png"
    return (
        <header className="app-header">
            <MainLogo />
            <nav className="app-nav">


                <Tooltip position="bottom" title="Notifications" additionalClass='notifications-btn-wraper'>
                    <div className="notifications-btn clickable clear icon-btn select size-40 icon-big i-Notifications" />
                </Tooltip>

                <Tooltip position="bottom" title="Update feed" additionalClass='inbox-btn-wraper'>
                    <div className="inbox-btn clickable clear icon-btn select size-40 icon-big i-Inbox" />
                </Tooltip>

                <Tooltip position="bottom" title="Invite members" additionalClass='invite-btn-wraper'>
                    <div className="invite-btn clickable clear icon-btn select size-40 icon-big i-Invite" />
                </Tooltip>

                <Tooltip position="bottom" title="sunday marketplace" additionalClass='apps-btn-wraper'>
                    <div className="apps-btn clickable clear icon-btn select size-40 icon-big i-Apps" />
                </Tooltip>

                <Tooltip position="bottom" title="Search everything" additionalClass='search-btn-wraper'>
                    <div className="search-btn clickable clear icon-btn select size-40 icon-big i-Search" />
                </Tooltip>

                <Tooltip position="bottom" title="Help" additionalClass='help-btn-wraper'>
                    <div className="help-btn clickable clear icon-btn select size-40 icon-big i-Help" />
                </Tooltip>

                <div className="divider" />

                <Tooltip position="bottom" title="Products switcher" additionalClass='switcher-btn-wraper'>
                    <div className="switcher-btn clickable clear icon-btn select size-40 icon-big i-Switcher" />
                </Tooltip>

                <PopUpMenu
                    position="bottom-end"
                    renderContent={({ onCloseModal }) => (
                        <UserAccountMenu
                            onCloseModal={onCloseModal} />
                    )}>
                    <div className="menu-btn clickable select size-32 clear">
                        <img className="monday-logo-icon" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746718734/monday_logo_icon_dumn0r.png" alt="" />
                        <div className='profile-img-wrapper'>
                            <img className="user-avatar" src={profileImg} alt="" />
                        </div>
                    </div>
                </PopUpMenu>



            </nav>
        </header>
    )
}


function UserAccountMenu() {
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onLogout() {
        logout()
        navigate('/home')
    }
    return (
        <section className='UserAccountMenu'>

            <div className="menu-header">
                <img
                    className="sunday-icon"
                    src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746718734/monday_logo_icon_dumn0r.png"
                />
                <p>Hi {user?.firstName}!</p>
            </div>
            <div className="h-divider"/>
            <div className="logout-btn clickable clear size-32 full-width icon-start i-LogOut"
                onClick={onLogout}

            >Logout</div>

        </section>
    )
}
