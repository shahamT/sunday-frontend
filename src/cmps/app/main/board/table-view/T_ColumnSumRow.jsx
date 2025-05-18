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

    // === Effects

    // === Functions

    return (
        <section className="T_ColumnSumRow">

            <div className="empty-indicator" />
            <div className="empty-placeholder">
                <div className="sum-row-round-edge">
                </div>
                <div className="sum-row-round-edge-bottom-line-hider">
                </div>

            </div>

            {columns.map((column, idx) => {
                if (column.type.variant === 'item') return ''
                return <T_ColumnSumCell key={column.id + idx} column={column} group={group} />

            })}

            <div className="empty-last-cell"></div>

        </section>
    )
}