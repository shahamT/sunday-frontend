// === Libs

// === Services

// === Actions
import { addTask } from "../../../../../store/actions/board.actions.js"

// === Hooks / React

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu.jsx"
import { AddNewSelection } from "../value-setter/AddNewSelection.jsx"

// ====== Component ======
// =======================

export function T_Filter({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions
    function onAddTask() {
        addTask({ itemColId: 0, isTop: true})
    }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="T_Filter">
            <div className="split-button size-32 filled new-item-btn">
                <div className="clickable btn-left filled" onClick={onAddTask}>New Item</div>
                <div className="seperator"></div>
                    <PopUpMenu
                        position="bottom-start"
                        renderContent={({ onCloseModal }) => (
                            <AddNewSelection onCloseModal={onCloseModal} />
                        )}>
                        <div className="clickable btn-right filled icon-btn i-DropdownChevronDown"></div>
                     </PopUpMenu>

            </div>
            <div className="search-btn clickable clear size-32 icon-start i-Search txt-search">Search</div>
        </section>
    )
}