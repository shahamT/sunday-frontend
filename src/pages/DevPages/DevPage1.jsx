// === Style


// === Libs

// === Services
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { loadBoards } from '../../store/actions/board.actions.js'
import { boardService } from '../../services/board'
import { PopUpMenu } from '../../cmps/reusables/PopUpMenu/PopUpMenu.jsx'
import { ColTypePicker } from '../../cmps/app/main/board/value-setter/ColTypePicker.jsx'
import { PersonsPicker } from '../../cmps/app/main/board/value-setter/PersonsPicker.jsx'

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function DevPage1({ /* prop1, prop2 */ }) {
    // === Consts
    // const boards = useSelector(storeState => storeState.boardModule.boards)
    // let board = boardService.getEmptyBoard()
    // console.log(board)

    // === Effects
    // useEffect(() => {
        // loadBoards()
    // },[])

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="DevPage1">
            <h1>DevPage1</h1>

            <PersonsPicker />
            {/* <div style={{padding:'200px', height:'100%', width:'100%'}}>
            <PopUpMenu
                position="bottom-end"
                renderContent={({ onCloseModal }) => (
                    <ColTypePicker onCloseModal={onCloseModal} />
                )}>
                <div className="clickable btn-right filled icon-btn i-DropdownChevronDown"></div>
            </PopUpMenu>
            </div> */}
        </section>
    )
}