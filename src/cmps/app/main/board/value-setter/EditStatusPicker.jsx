// === Libs

import Color from "@tiptap/extension-color"
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { ColorPicker } from "./ColorPicker"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function EditStatusPicker({ StatusArray }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>


    return (
        <section className="edit-status-picker">
            {StatusArray.map(status => (
                <div key={status.id} className="edit-status-item">
                    <div className="input-wrapper">

                        <PopUpMenu
                            position="bottom-start"
                            renderContent={({ onCloseModal }) => (
                                <ColorPicker
                                    onCloseModal={onCloseModal}
                                    status={status}
                                />
                            )}
                        >
                            <button type="button" className={`color-btn-icon icon-start i-HighlightColorBucket ${status.color}-bg `} />
                        </PopUpMenu>
                        <input
                            value={status.name}
                            readOnly
                        />
                    </div>


                </div>
            ))}
        </section>
    )
}