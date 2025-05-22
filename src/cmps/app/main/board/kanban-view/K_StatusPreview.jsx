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
            <div className={`status-header ${label.color}-bg-static`}>
                <span className="name">{label.name || 'Blank'}</span>
                <span className="amount">{label.tasks.length}</span>
            </div>

            {/* **************tasks*************** */}
            <div className="status-body">
                <div className="tasks">
                    {label.tasks.map(task => {
                        return <K_TaskPreview key={task.id} task={task}/>
                    })}
                </div>
            </div>
        
            <div className="add-btn-container">
                <button className="add-task-btn clickable clear size-32 icon-start i-AddSmall">Add item</button>
            </div>

        </section>
    )
}