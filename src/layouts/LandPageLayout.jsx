// === Style

// === Libs

// === Services

// === Actions

// === Hooks / React
import { Outlet } from "react-router-dom";
import { useRef, useState } from "react";

// === Imgs

// === Child Components
import { LandPageHeader } from "../cmps/land-page/LandPageHeader";

// ====== Component ======
// =======================

export function LandPageLayout({ /* prop1, prop2 */ }) {
    // === Consts
    const [isScrolled, setIsScrolled] = useState(false)
    const topLineRef = useRef(null);

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="LandPageLayout">
            <>
            <div className="topLine" ref={topLineRef} />
                <LandPageHeader />
                <main>
                    <Outlet />
                </main>
            </>
        </section>
    )
}