// === Libs


// === Services

// === Actions

// === Hooks / React


// === Imgs

// === Child Components
import { BoardHeader } from "./BoardHeader";
import { BoardContent } from "./BoardContent";
import { TaskPanel } from "./TaskPanel";
import { TaskDetails } from "./TaskDetails";

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
            <BoardHeader />
            <BoardContent />

            <TaskPanel
                side='right'
                defaultWidth={500}
                minWidth={200}
                maxWidth={700}
            >
                <TaskDetails />
            </TaskPanel>
        </section>
    )
}