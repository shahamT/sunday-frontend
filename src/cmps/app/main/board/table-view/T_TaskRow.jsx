// === Libs

import { T_Cell } from "./T_Cell"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function T_TaskRow({ task, columns }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <article className="T_TaskRow">
            <div className="menu-wraper" />

            <div className="row-wraper t-row">

                <div className="t-left-indicator" />
                {columns.map(column => {
                    const columnValue = task.columnValues.find(columnValue => columnValue.id === column.id)
                    return <T_Cell column={column} columnValue={columnValue} taskId={task.id}/>
                })}

                <div className="t-cell last" />

            </div>
        </article>
    )
}