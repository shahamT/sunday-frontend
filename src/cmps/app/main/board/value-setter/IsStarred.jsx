// === Libs

import { useEffect, useState } from "react"
import { updateBoard } from "../../../../../store/actions/board.actions"



// ====== Component ======
// =======================

export function IsStarred({ board }) {
    const [isStarred, setIsStarred] = useState(board.isStarred)
    const [boardToEdit, setBoardToEdit] = useState(null)

    useEffect(() => {
        setBoardToEdit(board)

        return () => {
            setBoardToEdit(null);
        }
    }, [board])


    // === Consts

    // === Effects
    // === Functions
    async function handleChange({ target }) {
        const updatedBoard = {
            ...boardToEdit,
            isStarred: !boardToEdit.isStarred

        }
        setBoardToEdit(updatedBoard)
        try{
            await updateBoard(updatedBoard)
            setIsStarred(prev => !prev)
        }
        catch (err) {
            console.error('Failed to update board')
        }
    }
        return (
            <section className="is-starred">
              
                <button
                    className={`star-toggle clickable size-32 icon-start select full-width left-aligned i-Favorite ${isStarred ? 'starred' : ''}`}
                    onClick={handleChange} >
                </button>
            </section>
        )
    }
