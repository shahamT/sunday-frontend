// === Style

// === Libs

// === Services

// === Actions

// === Hooks / React
import { Outlet } from "react-router-dom";
import { AppHeader } from "../cmps/app/header/AppHeader";

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ClearLayout({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="ClearLayout">
            <>
                <main>
                    <Outlet />
                </main>
            </>
        </section>
    )
}