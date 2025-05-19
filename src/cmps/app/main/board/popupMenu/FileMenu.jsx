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

export function FiledMenu({ onClearFile, imgUrl, imgTitle, onCloseModal }) {


    // const imgUrl = 'https://res.cloudinary.com/ditvgrfxq/image/upload/v1747392296/kbsu10mu7vuzlddlpwng.png'
    const downloadUrl = imgUrl.replace('/upload/', `/upload/fl_attachment:${imgTitle}/`)

    // === Functions


    return (
        <section className="file-menu">
            <button className="clickable clear size-32 icon-start full-width left-aligned i-Fullscreen" onClick={() => openGlobalModal(<FileModal imgUrl={imgUrl} onCloseModal={onCloseModal} />)} >Open file</button>
            <a href={downloadUrl} download>
                <div className="download-btn clickable clear size-32 i-Download icon-start full-width left-aligned" onClick={(e) => e.stopPropagation()}>Download file</div>
            </a>
            <div
                className="clickable clear size-32 icon-start full-width i-Delete full-width left-aligned"
                onClick={(e) => {
                    e.stopPropagation()
                    onClearFile()
                }
                }
            >
                Remove file
            </div>
            <div className="divider" />
            <button className="clickable clear size-32 i-CloseSmall icon-start full-width left-aligned" onClick={(e) => {
                e.stopPropagation()
                onCloseModal()
            }}>Close</button>
        </section>
    )
}
