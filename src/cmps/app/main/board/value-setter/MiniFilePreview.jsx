// === Libs

import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu";
import { Tooltip } from "../../../../reusables/tooltip/Tooltip";
import { FiledMenu } from "../popupMenu/FileMenu";

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function MiniFilePreview({ onCloseModal, imgUrl, imgTitle }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="mini-file-preview">
            <section className="img-container">
                <div className="menu-btn">
                    <PopUpMenu
                        position="bottom-end"
                        renderContent={({ onCloseModal }) => (
                            <FiledMenu
                            imgUrl={imgUrl}
                                onCloseModal={onCloseModal}
                            />
                        )}
                    >
                        <div className="menu-btn clickable clear size-40 icon-big icon-btn i-Menu" />
                    </PopUpMenu>
                </div>
                <section className="img-wrapper">
                    <img
                        src={imgUrl}
                    />
                </section>
            </section>
            {imgTitle &&
            <div className="img-footer">
                <Tooltip title={imgTitle}>
                    <p>{imgTitle}</p>
                </Tooltip>
            </div>
            
            }

        </section>
    )
}