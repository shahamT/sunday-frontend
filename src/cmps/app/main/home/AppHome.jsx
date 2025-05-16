// === Libs

import {BoardList } from "../board/appHeader/BoardList"
import { LeftNav } from "../board/appHeader/LeftNav"
// === Services

// === Actions

// === Hooks / React

// === Imgs

// ====== Component ======
// =======================

export function AppHome({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions
const user='User'
    // if (!data) return <div>Loading...</div>
    return (
        <section className="app-home">
            <section className="header">
            <p><span>Good day, {user}!</span><br /> Quickly access your recent boards, Inbox and workspaces
            </p>
            </section>
            <section className="main">
            <BoardList />
            {/* <img src="https://res.cloudinary.com/ditvgrfxq/image/upload/v1747320341/kkvc6y2yzsy9taa4d7y2.png" alt="Monday board" /> */}


            </section>
<section className="left-nav">
    <LeftNav/>
</section>

        </section>
    )
}