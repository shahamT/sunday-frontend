// === Libs

import { closeGlobalModal } from "../../../../../store/actions/app.actions"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function FileModal({ imgUrl, imgTitle = '' }) {

    //   const imgUrl = "https://img.freepik.com/premium-photo/playful-cute-fish-photo_960396-928043.jpg"

    // === Functions

    return (
        <section className="file-modal">
            <section className="header-container">
                <label>{imgTitle}</label>
                <div className="close-btn clickable clear size-40 i-CloseSmall " onClick={() => {
                    closeGlobalModal()
                }} />
            </section>
            <search className="img-conteiner">
                <img
                    src={imgUrl}

                />
            </search>

        </section>
    )
}