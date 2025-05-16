// === Libs

import { T_Cell } from "./T_Cell"

// === Services

// === Actions

// === Hooks / React
import { useState } from "react"

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { TaskMenu } from "../popupMenu/TaskMenu"

// ====== Component ======
// =======================

export function T_TaskRow({ task, columns, group }) {
    // === Consts
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <article className={`T_TaskRow ${isMenuOpen ? 'menu-in-focus' : ''}`}>

            <div className="menu-container">
                <div className="menu-wraper">
                    <PopUpMenu
                        position="bottom-start"
                        onOpen={() => setIsMenuOpen(true)}
                        onClose={() => setIsMenuOpen(false)}
                        renderContent={({ onCloseModal }) => (
                            <TaskMenu
                                onCloseModal={onCloseModal}
                                taskId={task.id}
                                groupId={group.id}

                            />
                        )}
                    >
                        <div className={`menu-btn clickable clear size-24 icon-btn i-Menu ${isMenuOpen ? 'in-focus' : ''}`} />
                    </PopUpMenu>
                </div>
            </div>

            <div className={`t-left-indicator ${group.color}-bg`} />


            {columns.map((column, idx) => {
                const columnValue = task.columnValues.find(columnValue => columnValue.colId === column.id)
                return <T_Cell key={column.id + idx} column={column} columnValue={columnValue} taskId={task.id} />
            })}
            <div className="empty-last-cell"></div>

        </article>
    )
}