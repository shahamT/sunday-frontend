// === Style


// === Libs

// === Services

// === Actions

// === Hooks / React
import { NavLink } from "react-router-dom";

// === Imgs

// === Child Components

// ====== Component ======
// =======================
export function AppSideNav({ }) {

    return (
        <nav className="AppSideNav" >
            <h1>side nav content </h1>
            <NavLink to="/app/home" className="clickable clear size-32 full-width" >Home </NavLink>
            <NavLink to="/app/board/randomid" className="clickable clear size-32 full-width" >BoardIndex </NavLink>
        </nav>
    )
}