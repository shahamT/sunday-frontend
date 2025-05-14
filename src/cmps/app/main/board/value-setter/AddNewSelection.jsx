// === Libs

// === Services

// === Actions
import { addGroup } from "../../../../../store/actions/board.actions.js"

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function AddNewSelection({ onCloseModal }) {
    // === Consts

    // === Effects

    // === Functions
    function onAddGroup() {
        addGroup(true)
        onCloseModal()
    }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="AddNewSelection">
            <div className="___-btn clickable clear size-32 icon-start i-Group" onClick={onAddGroup}>New group of items</div>
        </section>
    )
}