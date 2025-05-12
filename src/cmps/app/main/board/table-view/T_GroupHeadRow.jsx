// === Libs

import { T_ColumnHeaderCell } from "./T_ColumnHeaderCell"


// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function T_GroupHeadRow({ columns, group }) {
    // === Consts

    // === Effects

    // === Functions
    // console.log('got here')
    return (
        <section className="T_GroupHeadRow">
            <div className="menu-wraper" />
            <div className="row-wraper t-row">

                <div className="t-left-indicator top" />
                {columns.map((column, idx) => {
                    return <T_ColumnHeaderCell key={column.id + idx} column={column} groupId={group.id} />
                })}

                <div className="add-column-btn t-cell last">
                </div>
                
            </div>


        </section>
    )
}