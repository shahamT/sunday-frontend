

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


    const imgUrl = "https://img.freepik.com/premium-photo/playful-cute-fish-photo_960396-928043.jpg"
    return (
        
        <section className='dev-page-center'>
            <div className="container">
                {/* <IsStarred board={boards[0]}/> */}
                  {/* <FileModal imgUrl={imgUrl} closeGlobalModal={closeGlobalModal}/>  */}
            </div>
          
            <h1>dev2</h1>
            <PopUpMenu
                position="start-end"
                renderContent={({ onCloseModal }) => (
                    <MiniFilePreview
                        onCloseModal={onCloseModal}
                        imgUrl={imgUrl}
                    />
                )}
            >
                <div className="menu-btn clickable clear size-24 icon-btn i-Menu" />
            </PopUpMenu>
        </section>
    )
}