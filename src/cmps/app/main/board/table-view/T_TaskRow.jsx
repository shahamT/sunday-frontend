// === Libs

import { T_Cell } from "./T_Cell"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"

// ====== Component ======
// =======================

export function T_TaskRow({ task, columns, group }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <article className="T_TaskRow">
            <div className="menu-wraper">
                    <PopUpMenu
                        position="start-end"
                        renderContent={({ onCloseModal }) => (
                            // <SideNavModal
                            //     onCloseModal={onCloseModal}
                            //     board={board}
                            //     setEditingBoardId={setEditingBoardId}
                            //     setEditedTitle={setEditedTitle}
                            // />
                            <p className="temp"></p>
                        )}
                    >
                        <div className="menu-btn clickable clear size-24 icon-btn i-Menu" />
                    </PopUpMenu>
            </div>

            <div className="row-wraper t-row">

                <div className={`t-left-indicator ${group.color}-bg`} />


                {columns.map((column, idx) => {
                    const columnValue = task.columnValues.find(columnValue => columnValue.colId === column.id)
                    return <T_Cell key={column.id + idx} column={column} columnValue={columnValue} taskId={task.id} />
                })}

                <div className="t-cell last" />

            </div>
        </article>
    )
}