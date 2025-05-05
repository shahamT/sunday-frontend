// === Style

// === Libs

// === Services

// === Actions

// === Hooks / React
import { Navigate, useNavigate } from 'react-router-dom'

// === Imgs
import logo from '../../assets/img/logo/monday-logo.png';

// === Child Components
import { Tooltip } from '../reusables/tooltip/Tooltip';

// ====== Component ======
// =======================

export function MondayMainLogo() {
    // === Consts
    const navigate = useNavigate();

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <div className="MondayMainLogo">

            <img className="logo-img" src={logo} alt="" onClick={() => navigate({ pathname: '/home' })} />

        </div>
    )
}