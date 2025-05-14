

// === Libs

import { useState } from "react";
import { PopUpMenu } from "../../cmps/reusables/PopUpMenu/PopUpMenu";
import { ColorPicker } from "../../cmps/app/main/board/value-setter/ColorPicker";

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function DevPage2({ /* prop1, prop2 */ }) {

    const [lableColor, setLableColor] = useState(`color-1`)


    return (
        <section className='color-picker-btn'>
            <h1>dev2</h1>
            <PopUpMenu
                position="start-end"
                renderContent={({ onCloseModal }) => (
                    <ColorPicker
                        onCloseModal={onCloseModal}
                        setLableColor={setLableColor}
                        lableColor={lableColor}
                    />
                )}
            >
                <div className={`circle color-picker-btn ${lableColor}`} />

            </PopUpMenu> 
        </section>
    )
}