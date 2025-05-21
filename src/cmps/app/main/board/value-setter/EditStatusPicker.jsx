// === Libs

import { EditLable } from "./EditLabel"
import { boardService } from "../../../../../services/board"
import { addLabel, updateLabel } from "../../../../../store/actions/board.actions"




// ====== Component ======
// =======================

export function EditStatusPicker({ StatusArray, columnId }) {

    // === Consts

    // === Functions

    return (
        <>
            {StatusArray.map(status => (
                <div key={status.id} className="edit-status-item">
                    <div className="input-wrapper">
                        <EditLable status={status} columnId={columnId} />
                    </div>
                </div>
            ))}

            <button
                className="add-btn clickable outlined icon-start i-AddSmall full-width clear size-32"
                onClick={() => {
                    const emptyLabel = boardService.getEmptyLabel()
                    addLabel(columnId, emptyLabel)
                }}
            >
                New label
            </button>


        </>
    )
}