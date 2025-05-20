// === Style

// === Libs

// === Services

// === Actions

// === Hooks / React
import { Navigate, useNavigate } from 'react-router-dom'

// === Imgs

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

            <img className="logo-img" src='https://res.cloudinary.com/dqaq55tup/image/upload/v1747732168/sunday-com-logo_ezd0ht.png' alt="" onClick={() => navigate({ pathname: '/home' })} />

        </div>
    )
}