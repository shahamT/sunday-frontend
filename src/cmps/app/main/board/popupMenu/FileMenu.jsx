// === Libs

import { GlobalModal } from "../../../../reusables/GlobalModal/GlobalModal"
import { openGlobalModal } from "../../../../../store/actions/app.actions"
import { FileModal } from "./FileModal"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function FiledMenu({ imgUrl, imgTitle, onCloseModal }) {



    const downloadUrl = `${imgUrl}?fl_attachment=${imgTitle}`
    // const downloadUrl = `https://res.cloudinary.com/demo/image/upload/fl_attachment/sample.jpg`

    // === Functions

    // function onRemoveFile() {
    //     console.log('onRemoveFile -in development')
    // }


    return (
        <section className="file-menu">
            <button className="clickable clear size-32 icon-start full-width left-aligned i-Fullscreen" onClick={() => openGlobalModal(<FileModal imgUrl={imgUrl} onCloseModal={onCloseModal} />)} >Open file</button>
            <a href={downloadUrl} download>
                <div className="download-btn clickable clear size-32 i-Download icon-start full-width left-aligned">Download file</div>
            </a>

            {/* <button className="clickable clear  size-32 icon-start full-width i-Delete full-width left-aligned" onClick={() => onRemoveFile()}>
                Delete file
            </button> */}
            <div className="divider" />
            <button className="clickable clear size-32 i-CloseSmall icon-start full-width left-aligned" onClick={() => {
                onCloseModal()
            }}>Close</button>
        </section>
    )
}
