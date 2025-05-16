// === Libs

import { closeGlobalModal } from "../../../../../store/actions/app.actions"



export function FileModal({ imgUrl, imgTitle  }) {

    //   const imgUrl = "https://img.freepik.com/premium-photo/playful-cute-fish-photo_960396-928043.jpg"

    // === Functions
    console.log(imgUrl)
    return (
        <section className="file-modal">

            {imgTitle &&
                <header>
                    <label className="img-title">{imgTitle}</label>
                </header> }

                <div className="close-btn clickable clear size-40 i-CloseSmall " onClick={() => {
                    closeGlobalModal()
                }} />

            <search className="img-conteiner">
                <img
                    src={imgUrl}
                />
            </search>

        </section>
    )
}