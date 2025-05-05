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

export function LandPageLayout({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="ClearLayout">
            <>
                <main>
                    <h1>ClearLayout main content</h1>
                    <Outlet />
                </main>
            </>
        </section>
    )
}