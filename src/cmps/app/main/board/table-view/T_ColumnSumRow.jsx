// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { T_ColumnSumCell } from "./T_ColumnSumCell"

// ====== Component ======
// =======================

export function T_ColumnSumRow({ columns, group }) {
    // === Consts

 

    return (
        <section className="T_ColumnSumRow">

            <div className="menu-wraper" />
            <div className="empty placeholder" />
            <div className="empty placeholder" />

            <div className="sum-cells-wraper">
                {columns.map((column, idx) => {
                    if (column.type.variant === 'item') return ''
                    return <T_ColumnSumCell key={column.id + idx} column={column} group={group} />

                })}
            </div>

            <div className="empty-last-cell"></div>

        </section>
    )
}