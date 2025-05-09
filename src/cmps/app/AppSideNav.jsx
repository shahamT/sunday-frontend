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
            <NavLink to="/app/home" className="clickable select clear size-32 full-width" >Home </NavLink>
            <NavLink to="/app/board/randomid" className="clickable select clear size-32 full-width" >BoardIndex </NavLink>
            <NavLink to="/app/board/randomid/task/taskId" className="clickable select clear size-32 full-width" >TaskDetails </NavLink>
        </nav>
    )
}