// === Libs

import { useSelector } from "react-redux"
import { BoardList } from "../board/appHeader/BoardList"
import { RightNav } from "../board/appHeader/RightNav"

// ====== Component ======
// =======================

export function AppHome({ /* prop1, prop2 */ }) {
    // === Consts
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    // === Effects

    // === Functions

    return (
        <section className="app-home">
            <section className="header">
                <p className="greeting">Good day, {user.firstName}!</p>
                <p className="subtitle">Quickly access your recent boards, Inbox and workspaces</p>
            </section>
            <section className="main">
                <BoardList />

                <RightNav />
            </section>

        </section>
    )
}