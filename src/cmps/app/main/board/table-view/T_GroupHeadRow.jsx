// === Libs



// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { ColTypePicker } from "../value-setter/ColTypePicker"
import { T_ColumnHeaderCell } from "./T_ColumnHeaderCell"

// ====== Component ======
// =======================

export function T_GroupHeadRow({ columns, group, liveColumnWidthsRef, resizeVersion, bumpResizeVersion }) {
    // === Consts

    // === Effects

    // === Functions

    return (
        <section className="T_GroupHeadRow">
            <div className="menu-container" />
            <div className={`t-left-indicator top ${group.color}-bg`} />

            {columns.map((column, idx) => {
                return <T_ColumnHeaderCell
                    key={column.id + idx}
                    column={column}
                    groupId={group.id}
                    liveColumnWidthsRef={liveColumnWidthsRef}
                    resizeVersion={resizeVersion}
                    bumpResizeVersion={bumpResizeVersion}

                />
            })}

            <div className="add-column-btn-container">
                <PopUpMenu
                    position="bottom-end"
                    renderContent={({ onCloseModal }) => (
                        <ColTypePicker onCloseModal={onCloseModal} />
                    )}>
                    <div className="add-column-btn clickable clear icon-btn size-24 i-Add" />
                </PopUpMenu>


            </div>

        </section>
    )
}