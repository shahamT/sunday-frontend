// === Libs

import { updateLabel } from "../../../../../store/actions/board.actions"
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { ColorPicker } from "./ColorPicker"
import { useEffect, useState } from "react"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function EditLable({ status, columnId }) {
    // === Consts

    const [labelToEdit, setLabelToEdit] = useState(status)
    const [selectedColor, setSelectedColor] = useState(status.color)
    const [isInputEditable, setIsInputEditable] = useState(false)
    const [labelName, setLabelName] = useState(labelToEdit.name)
    // === Effects

    useEffect(() => {
        if (selectedColor !== status.color) {
            const updatedLabel = { ...status, color: selectedColor }
            updateLabel(columnId, updatedLabel)
        }
    }, [selectedColor])



    // === Functions

    function handleRename() {
        if (!labelName.trim() || labelName === status.name) {
            setIsInputEditable(false)
            return
        }

        const updatedLabel = { ...status, name: labelName.trim() }
        updateLabel(columnId, updatedLabel)
        setIsInputEditable(false)
    }

    return (
        <section className="edit-label">


            <PopUpMenu
                position="bottom-start"
                renderContent={({ onCloseModal }) => (
                    <ColorPicker
                        onCloseModal={onCloseModal}
                        status={status}
                        setColor={setSelectedColor}
                        selectedColor={selectedColor}
                    />
                )}
            >
                <button type="button" className={`color-btn-icon icon-start i-HighlightColorBucket ${status.color}-bg `} />
            </PopUpMenu>
            {!isInputEditable ? (
                <input
                type="text"
                value={labelName}
                onClick={e=>e.stopPropagation()}
                onChange={(e) => setLabelName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => e.key === "Enter" && handleRename()}
                // autoFocus
            />
            ) : (
                <input
                    type="text"
                    value={labelToEdit.name}
                    readOnly
                    onClick={() => {
                        setIsInputEditable(true)
                        setLabelName(status.name)
                    }} />
                
            )}




        </section>
    )
}