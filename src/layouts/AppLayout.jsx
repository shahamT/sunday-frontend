
// === Libs

// === Services

// === Actions

// === Hooks / React
import { Outlet } from "react-router-dom";

// === Imgs

// === Child Components
import { AppHeader } from "../cmps/app/header/AppHeader";
import { AppSideNav } from "../cmps/app/AppSideNav";

// ====== Component ======
// =======================

export function AppLayout({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="AppLayout">
            <>
                <AppHeader />
                <AppSideNav/>
                <main>
                    <Outlet />
                </main>
            </>
        </section>
    )
}