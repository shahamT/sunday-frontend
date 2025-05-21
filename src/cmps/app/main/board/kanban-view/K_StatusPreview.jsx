// === Libs

import { K_TaskPreview } from "./K_TaskPreview"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function K_StatusPreview({ label }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_StatusPreview">

            {/* **************label header*************** */}
            <div className="status-header">
                <span>{label.name}</span>
                <span>{label.tasks.length}</span>
            </div>

            {/* **************tasks*************** */}
            {label.tasks.map(task => {
                return <K_TaskPreview key={task.id} task={task}/>
            })}

            {/* **************add task btn*************** */}
            <button className="add-task-btn clickable clear size-32 icon-start i-AddSmall"></button>
        </section>
    )
}