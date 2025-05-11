// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function T_TaskRow({ task }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <article className="T_TaskRow">
            <div className="menu-wraper">

            </div>
            <div className="t-left-indicator" />
            <div className="row-wraper t-row">
                <input type="checkbox" name="" id="" />
                {task.columnValues.filter(columnValue => {
                    columnValue.id === 'name'
                    console.log("columnValue: ", columnValue)
                    }).value}
            </div>
        </article>
    )
}