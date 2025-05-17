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
    // createArreyFromColId(group, columns)
    // const columnValues = getArreyByType(group, columns)
    // console.log("lslss", columnValues)
    // function getArreyByType(group, columns) {
    //     return columns.map(column => {
    //         const columnValues = createArreyFromColId(group, column)
    //         return columnValues
    //     })
    // }

    // function createArreyFromColId(group, column) {
    //     // const { type, id } = column
    //     const columnValues = []
    //     for (let i = 0; i < group.tasks.length; i++) {
    //         const columnValue = group.tasks[i].columnValues.find(col => col.colId === column.id)?.value
    //         columnValues.push(columnValue)
    //     }
    //     console.log('column',columnValues)
    //     return columnValues
    // }

 

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