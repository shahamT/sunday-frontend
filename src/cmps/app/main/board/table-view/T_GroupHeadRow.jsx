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

export function T_GroupHeadRow({ columns, group }) {
    // === Consts

    // === Effects

    // === Functions

    return (
        <section className="T_GroupHeadRow">
            <div className="menu-wraper" />
            <div className="row-wraper t-row">

                <div className={`t-left-indicator top ${group.color}-bg`} />
                {columns.map((column, idx) => {
                    return <T_ColumnHeaderCell key={column.id + idx} column={column} groupId={group.id} />
                })}

                <div className="add-column-btn-container t-cell last">
                    <PopUpMenu
                        position="bottom-end"
                        renderContent={({ onCloseModal }) => (
                            <ColTypePicker onCloseModal={onCloseModal} />
                        )}>
                        <div className="add-column-btn clickable clear icon-btn size-24 i-Add" />
                    </PopUpMenu>


                </div>
                {/* empty-cell t-cell no-divider footer */}

            </div>


        </section>
    )
}