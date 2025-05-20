// === Libs

import { BoardList } from "../board/appHeader/BoardList"
import { RightNav } from "../board/appHeader/RightNav"
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
    const user = 'User'
    // if (!data) return <div>Loading...</div>
    return (
        <section className="app-home">
            <section className="header">
                <p className="greeting">Good day, {user}!</p>
                <p className="subtitle">Quickly access your recent boards, Inbox and workspaces</p>
            </section>
            <section className="main">
                {/* <section className="board-"> */}
                    <BoardList />
                {/* </section> */}


                    <RightNav />

            </section>

        </section>
    )
}