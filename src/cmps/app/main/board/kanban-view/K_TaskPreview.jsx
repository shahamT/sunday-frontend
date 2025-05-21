// === Libs

import { K_ContentPreview } from "./K_ContentPreview"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function K_TaskPreview({ task }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_TaskPreview">
            <h1>K_TaskPreview</h1>

            <div>{task.columnValues[0].value}</div> {/** needs to be editable text */}
            {task.columnValues.map(cv => {
                return <K_ContentPreview key={cv.colId} colId={cv.colId} value={cv.value}/>
            })}

            {/* map on CV - clickables dynamic someclassname to help add before and after and the correct cmp to edit CV. dynamic??  */}

        </section>
    )
}