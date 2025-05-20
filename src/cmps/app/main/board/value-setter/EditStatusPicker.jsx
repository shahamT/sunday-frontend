// === Libs

import { useState } from "react"
import { EditLable } from "./EditLabel"
import { boardService } from "../../../../../services/board"
import { addLabel, updateLabel } from "../../../../../store/actions/board.actions"
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { ColorPicker } from "./ColorPicker"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function EditStatusPicker({ StatusArray, columnId}) {

    // === Consts
    const [labelToEdit, setLabelToEdit] = useState(boardService.getEmptyLabel())
    const [labelName, setLabelName] = useState(labelToEdit.name)

    const [isNewLabelOpen, setIsNewLabelOpen] = useState(false)
    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>

    function handleRename() {
        if (!labelName.trim() || labelName === labelToEdit.name) {
            setIsInputEditable(false)
            return
        }

        const updatedLabel = { ...labelToEdit, name: labelName.trim() }
        updateLabel(columnId, updatedLabel)
        setIsInputEditable(false)
    }

    function handleSetColor(color) {
        setLabelToEdit(prev => ({ ...prev, color: color }))
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
                    <PopUpMenu
                        position="bottom-start"
                        renderContent={({ onCloseModal }) => (
                            <ColorPicker
                                // onCloseModal={isNewLabelOpen ? () => { } : onCloseModal}
                                status={labelToEdit}
                                setColor={handleSetColor}
                                selectedColor={labelToEdit.color}
                           
                            />
                        )}
                    >
                        <button type="button" className={`color-btn-icon icon-start i-HighlightColorBucket ${labelToEdit.color}-bg `} />
                    </PopUpMenu>

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
                    <div className="divider" />
                    <button
                        className="apply-btn clickable clear size-32"
                        onClick={() => {
                            const newLabel = { ...labelToEdit, name: labelName.trim() }
                            addLabel(columnId, newLabel)
                            setIsNewLabelOpen(false)  }}
                    >
                        Apply
                    </button>
                </section>
            ) : (
                <button className="add-btn clickable icon-start i-AddSmall full-width clear size-32" onClick={() => setIsNewLabelOpen(true)}>New label</button>
            )}



        </section>
    )
}