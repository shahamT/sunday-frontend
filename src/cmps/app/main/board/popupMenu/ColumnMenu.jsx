// === Libs

import { showErrorMsg, showSuccessMsg } from "../../../../../services/base/event-bus.service"
import { removeColumn } from "../../../../../store/actions/board.actions"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ColumnMenu({ onCloseModal, column, inputRef }) {
    // === Consts

    // === Effects
    // === Functions
  async function onRemoveColumn(){
    try {
        await removeColumn(column.id)
        showSuccessMsg(`Column ${column.name} deleted.`)
    }
    catch (err){ showErrorMsg('Something went wrong')
    }

   }
    
    // if (!data) return <div>Loading...</div>
    return (
        <section className="column-popup-menu">

            <div className="clickable clear size-32 i-Edit icon-start full-width left-aligned" onClick={() => {
                onCloseModal()
            }}>Rename</div>
            <div className="divider" />
            <div className="delete-btn clickable clear size-32 icon-start full-width i-Delete full-width left-aligned"
             onClick={onRemoveColumn}>
                Delete
            </div>
        </section>
    )
}