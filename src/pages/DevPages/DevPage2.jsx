

// === Libs

import { useState } from "react";
import { PopUpMenu } from "../../cmps/reusables/PopUpMenu/PopUpMenu";
import { MiniFilePreview } from "../../cmps/app/main/board/value-setter/MiniFilePreview";

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function DevPage2({ /* prop1, prop2 */ }) {



    const imgUrl = "https://img.freepik.com/premium-photo/playful-cute-fish-photo_960396-928043.jpg"
    return (
        <section className='color-picker-btn'>
            <h1>dev2</h1>
            <PopUpMenu
                position="start-end"
                renderContent={({ onCloseModal }) => (
                    <MiniFilePreview
                        onCloseModal={onCloseModal}
                        imgUrl={imgUrl}
                        // selectedColor={selectedColor}
                        // setColor={setColor}
                        // variant={variant}
                    />
                )}
            >
                <div className={`color-picker-btn ${selectedColor}-bg`} />

            </PopUpMenu> 
        </section>
    )
}