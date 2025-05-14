// === Libs

import { addGroup, removeColumn, removeGroup } from "../../../../../store/actions/board.actions"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ColumnMenu({ onCloseModal, columnId, inputRef }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="column-popup-menu">

            <div className="clickable clear size-32 i-Edit icon-start full-width left-aligned" onClick={() => {
                onCloseModal()
            }}>Rename</div>
            <div className="divider" />
            <div className="delet-btn clickable clear size-32 icon-start full-width i-Delete full-width left-aligned" onClick={() => removeColumn(columnId)}>
                Delete
            </div>
        </section>
    )
}