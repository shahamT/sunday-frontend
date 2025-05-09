import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { MainLogo } from './WMLogo'
import { Tooltip } from '../../reusables/tooltip/Tooltip'

export function AppHeader(props) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

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

                <div className="divider"/>

                <Tooltip position="bottom" title="Products switcher" additionalClass='switcher-btn-wraper'>
                    <div className="switcher-btn clickable clear icon-btn select size-40 icon-big i-Switcher" />
                </Tooltip>
                

                <div className="menu-btn clickable select size-32 clear">
                    <img className="monday-logo-icon" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746718734/monday_logo_icon_dumn0r.png" alt="" />
                    <img className="user-avatar" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1746718601/default_user_photo_ak7mer.png" alt="" />
                </div>

            </nav>
        </header>
    )
}
