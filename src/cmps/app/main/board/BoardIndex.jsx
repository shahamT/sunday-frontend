// === Libs


// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { BoardContent } from "./BoardContent";
import { BoardHeader } from "./BoardHeader";

// ====== Component ======
// =======================

export function BoardIndex({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="BoardIndex">
            <h1>BoardIndex</h1>
            <BoardHeader/>
            <BoardContent/>
        </section>
    )
}