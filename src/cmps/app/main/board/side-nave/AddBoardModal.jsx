// === Libs

import { useEffect, useState } from "react"
import { boardService } from "../../../../../services/board"
import { addBoard } from "../../../../../store/actions/board.actions"
import { useNavigate } from "react-router-dom"
import { showErrorMsg } from "../../../../../services/base/event-bus.service"
import { updateUser } from "../../../../../store/actions/user.actions"

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
    function hendleChange({ target }) {
        const field = target.name
        let value = target.value
        setNewBoard(prevNewBoard => ({ ...prevNewBoard, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            const savedBoard = await addBoard(newBoard)
            updateUser(savedBoard._id)
            closeGlobalModal()
            navigate(`/app/board/${savedBoard._id}`)
        }
        catch (err) {
            console.error('Save failed')
            showErrorMsg('Save failed')
        }
    }

    const { name } = newBoard
    return (
        <section className="add-board-modal">
            <button className="close-btn clickable clear size-32 i-Close" onClick={() => closeGlobalModal()} />
            <form onSubmit={onSubmit}>
                <h1 className="title-add-modal">Create board</h1>
                <p className="title">Board name</p>
                <input type="text" name="name" value={name} autoFocus onChange={hendleChange}
                />
                <p className="new-board-encourage">Let’s get you started with a fresh new board!</p>
                <div className="divider" />
                <div className="add-board-btns">
                    <div className="cancel-btn clickable clear size-40" onClick={(ev) => {
                        ev.stopPropagation()
                        closeGlobalModal()
                    }}>Cancel</div>
                    <div className="create-btn clickable filled size-40" onClick={onSubmit} >Create Board</div>
                </div>
            </form>
        </section>
    )
}