// === Libs

import { useState } from "react"
import { EditLable } from "./EditLabel"
import { boardService } from "../../../../../services/board"
import { addLabel, updateLabel } from "../../../../../store/actions/board.actions"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function EditStatusPicker({ StatusArray, columnId }) {

    // === Consts
    const [labelToEdit, setLabelToEdit] = useState(boardService.getEmptyLabel())
    const [labelName, setLabelName] = useState(labelToEdit.name)


    const [isNewLabelOpen, setIsNewLabelOpen] = useState(false)
    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>

    function handleRename() {
        if (!labelName.trim() || labelName === labelToEdit.name) {
            // setIsInputEditable(false)
            return
        }

        const updatedLabel = { ...labelToEdit, name: labelName.trim() }
        updateLabel(columnId, updatedLabel)
        setIsInputEditable(false)
    }

    return (
        <section className="edit-status-picker">
            {StatusArray.map(status => (
                <div key={status.id} className="edit-status-item">
                    <div className="input-wrapper">
                        <EditLable status={status} columnId={columnId} />
                    </div>
                </div>
            ))}
            {isNewLabelOpen ? (

                <section className="add-label">

                    <input
                        type="text"
                        value={labelName}
                        onClick={e => e.stopPropagation()}
                        placeholder="Add Label"
                        autoFocus
                        onChange={(e) => setLabelName(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => {
                            (e.key === "Enter") &&
                            handleRename()
                        }
                        }
                    />
                    <button className="apply-btn clickable clear size-32" onClick={() => {
                        const newLabel = { ...labelToEdit, name: labelName.trim() }
                        addLabel(columnId, newLabel)
                        setIsNewLabelOpen(false)

                    }}>Apply</button>
                </section>
            ) : (
                <button className="add-btn clickable icon-start i-AddSmall full-width clear size-32" onClick={() => setIsNewLabelOpen(true)}>New label</button>
            )}



        </section>
    )
}