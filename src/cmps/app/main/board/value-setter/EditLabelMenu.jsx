// === Libs

import { removeLabel } from "../../../../../store/actions/board.actions"



// ====== Component ======
// =======================

export function EditLabelMenu({ labelId, onCloseModal, columnId }) {
    // === Consts

    // === Effects



    // === Functions

    async function onRemovelabel(labelId, columnId) {
        try {
            await removeLabel(labelId, columnId)
        }
        catch (err) {
            console.log('Failed to remove label')
        }
    }



    return (
        <section className="edit-label-menu">
            <div
                className="delete-btn clickable clear size-32 icon-start full-width i-Delete full-width left-aligned"
                onClick={() => onRemovelabel(labelId, columnId)}
            >
                Delete label
            </div>
        </section>
    )
}
