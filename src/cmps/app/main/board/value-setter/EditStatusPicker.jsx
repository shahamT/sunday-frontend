// === Libs

import Color from "@tiptap/extension-color"
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { ColorPicker } from "./ColorPicker"
import { useState } from "react"
import { EditLable } from "./EditLabel"
import { useParams } from "react-router-dom"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function EditStatusPicker({ StatusArray, columnId }) {
    // === Consts
    const [selectedColor, setSelectedColor] = useState()
    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>


    return (
        <section className="edit-status-picker">
            {StatusArray.map(status => (
                <div key={status.id} className="edit-status-item">
                    <div className="input-wrapper">
                        <EditLable status={status} columnId={columnId}  />
                      
                    </div>


                </div>
            ))}
        </section>
    )
}