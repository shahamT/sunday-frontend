
import './main-logo.scss'

import mainLogoImg from "../../../assets/img/logo/main-logo.png"


export function MainLogo() {

    return (
        <div className="main-logo-wraper">
            <img className="logo-img" src={mainLogoImg} alt="" onClick={() => navigate({ pathname: '/home' })} />
            <p className="logo-txt">Company</p>
        </div>
    )
}