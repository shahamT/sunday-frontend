

// === Libs

import { useState } from "react";
import { PopUpMenu } from "../../cmps/reusables/PopUpMenu/PopUpMenu";
import { MiniFilePreview } from "../../cmps/app/main/board/value-setter/MiniFilePreview";
import { GlobalModal } from "../../cmps/reusables/GlobalModal/GlobalModal";
import { FiledMenu } from "../../cmps/app/main/board/popupMenu/FileMenu";
import { FileModal } from "../../cmps/app/main/board/popupMenu/FileModal";
import { IsStarred } from "../../cmps/app/main/board/value-setter/IsStarred";
import { useSelector } from "react-redux";
import { closeGlobalModal } from "../../store/actions/app.actions";

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function DevPage2({ /* prop1, prop2 */ }) {

    const boards = useSelector(storeState => storeState.boardModule.boards)


    return (

        <section className='dev-page-center'>
            <div className="container">
            </div>

            <section class="sticky">
            <div className="status-picker-example">
                <div class="bubbles">
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>

                </div></div>
            </section>
        </section>
    )
}