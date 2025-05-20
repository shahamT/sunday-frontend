// === Libs

import { useControlledInput } from "../../../../../hooks/useControlledInput"
import { updateLabel } from "../../../../../store/actions/board.actions"
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { ColorPicker } from "./ColorPicker"
import { useEffect, useState } from "react"



// ====== Component ======
// =======================

export function EditLable({ status, columnId }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput(status.name)

    // === Effects


    // === Functions

    function handleRename() {
        const updatedLabel = { ...status, name: value }
        updateLabel(columnId, updatedLabel)
        return
    }

    function handleColorChange(selectedColor) {
        const updatedLabel = { ...status, color: selectedColor }
        updateLabel(columnId, updatedLabel)
    }

    return (
        <section className="edit-label">

            <div className="color-picker-wraper">
                <PopUpMenu
                    position="bottom-start"
                    renderContent={({ onCloseModal }) => (
                        <ColorPicker
                            onCloseModal={onCloseModal}
                            setColor={handleColorChange}
                            selectedColor={status.color}
                        />
                    )}
                >
                    <button type="button" className={`color-btn-icon clickable size-24 icon-btn i-HighlightColorBucket ${status.color}-bg `} />
                </PopUpMenu>
            </div>
            <div className="input-wrapper">
                <input
                    type="text"
                    value={value}
                    placeholder="Add Label"
                    onClick={e => e.stopPropagation()}
                    onChange={handleChange}
                    onBlur={handleRename}
                    onKeyDown={(e) => e.key === "Enter" && handleRename()}
                />
                <div className="menu-btn clickable clear size-24 icon-btn i-Menu" />
            </div>


        </section>
    )
}