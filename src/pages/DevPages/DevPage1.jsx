// === Style


// === Libs

// === Services
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { loadBoard } from '../../store/actions/board.actions.js'
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
    const board = useSelector(storeState => storeState.boardModule.board)
    // let board = boardService.getEmptyBoard()
    const selectedPersons = [{
    _id: "cKdrA",
    account: "acc001",
    firstName: "John",
    lastName: "Doe",
    email: "user1@company.com",
    profileImg: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&length=2&rounded=true&bold=true"
}]

    // === Effects
    useEffect(() => {
        loadBoard('RfYrL')
    },[])

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="DevPage1">
            <h1>DevPage1</h1>

            
            <div style={{padding:'300px', height:'100%', width:'100%'}}>
            <PopUpMenu
                position="top"
                renderContent={({ onCloseModal }) => (
                    <PersonsPicker onCloseModal={onCloseModal} currSelectedPersons={selectedPersons} />
                )}>
                <div className="clickable btn-right filled icon-btn i-DropdownChevronDown"></div>
            </PopUpMenu>
            </div>
        </section>
    )
}