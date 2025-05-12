// === Style


// === Libs

// === Services
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { loadBoards } from '../../store/actions/board.actions.js'
import { boardService } from '../../services/board'

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function DevPage1({ /* prop1, prop2 */ }) {
    // === Consts
    // const boards = useSelector(storeState => storeState.boardModule.boards)
    let board = boardService.getEmptyBoard()
    console.log(board)

    // === Effects
    useEffect(() => {
        // loadBoards()
    },[])

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="DevPage1">
            <h1>DevPage1</h1>
        </section>
    )
}