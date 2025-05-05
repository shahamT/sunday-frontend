// === Style

// === Libs

// === Services

// === Actions

// === Hooks / React
import { Outlet } from "react-router-dom";
import { LandPageHeader } from "../cmps/land-page/LandPageHeader";

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
        <section className="LandPageLayout">
            <>
                <LandPageHeader />
                <main>
                    <Outlet />
                </main>
            </>
        </section>
    )
}