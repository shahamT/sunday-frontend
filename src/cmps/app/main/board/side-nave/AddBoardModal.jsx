// === Libs

import { useEffect, useState } from "react"
import { boardService } from "../../../../../services/board"
import { addBoard } from "../../../../../store/actions/board.actions"
import { useNavigate } from "react-router-dom"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function AddBoardModal({ closeGlobalModal }) {
    // === Consts
    const [newBoard, setNewBoard] = useState('')
    const navigate = useNavigate()
    
    // === Effects
    useEffect(() => {
        const board = boardService.getEmptyBoard()
        setNewBoard({ ...board, name: 'New Board' })
    }, [])
    
    // === Functions
    function hendleChange({target}){
        const field = target.name
        let value = target.value   
        setNewBoard(prevNewBoard => ({ ...prevNewBoard, [field]: value }))

        

     }
     function onSubmit(ev) {
        ev.preventDefault()
        addBoard(newBoard)
            .then((savedBoard) => {
                closeGlobalModal()
                navigate(`/app/board/${savedBoard._id}`)
            })
            .catch(err => console.error('Save failed', err))


    }

    const { name } = newBoard
    return (
        <section className="ComponentName">
            <h1>Create board</h1>
            <form onSubmit={onSubmit}>
            <p>Board name</p>
            <input type="text" name="name" value={name} autoFocus onChange={hendleChange}
            />
            <div className="cancel-btn clickable clear size-40" onClick={(ev) => {
                ev.stopPropagation()
                closeGlobalModal()}}>Cancel</div>
                <div className="create-btn clickable filled size-40" onClick={onSubmit} >Create Board</div>
            </form>
        </section>
    )
}