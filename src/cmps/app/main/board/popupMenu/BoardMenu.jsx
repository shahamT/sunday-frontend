// === Libs

import { useEffect, useState } from "react"
import { loadBoards, removeBoard, updateBoard } from "../../../../../store/actions/board.actions"
import { showSuccessMsg } from "../../../../../services/base/event-bus.service"
import { useNavigate, useParams } from "react-router-dom"
import { DeleteBoardModal } from "./DeleteBoardModal"
import { openGlobalModal, closeGlobalModal } from "../../../../../store/actions/app.actions"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function BoardMenu({ board, setEditingBoardId, setEditedTitle, onCloseModal }) {
const {boardId}=useParams()
    // === Consts
    const [boardToEdit, setBoardToEdit] = useState(null)
    const navigate = useNavigate()
    // const debounceOnSetTxtToEdit = useRef(debounce(setTxtToEdit, 200))

    // === Effects
    useEffect(() => {
        setBoardToEdit(board)

        return () => {
            setBoardToEdit(null);
        }
    }, [board])


    // === Functions
    async function handleChange({ target }) {
        const updatedBoard = {
            ...boardToEdit,
            isStarred: !boardToEdit.isStarred

        }
        setBoardToEdit(updatedBoard)
        try {
            await updateBoard(updatedBoard)
        }
        catch (err) {
            console.error('Failed to update board')

        }
    }

    async function onRemoveBoard(id) {
        try {
            await removeBoard(id)
            showSuccessMsg('We successfully deleted the board')
            if (boardId === id) {
            navigate(`/app/home/`)

        }

        }
        catch (err) {
            console.log('Failed to remove board')
        }

    }

    function onSubmit(ev) {
        ev.preventDefault()
        console.log(boardToEdit)
        updateBoard({ ...boardToEdit })
            .then(() => {
                loadBoards()
                setOpenBoardId(null)
            })
            .catch(err => console.error('Save failed', err))
    }



    if (!boardToEdit) return <div>Loading...</div>
    const { isStarred, _id } = boardToEdit
    return (
        <section className="board-popup-menu">

            <a href={`${window.location.origin}/app/board/${board._id}`} className="clickable clear size-32 icon-start full-width left-aligned i-ExternalPage" target="_blank" rel="noopener noreferrer">Open in new tab</a>
            <div className="divider" />
            <div className="clickable clear size-32 i-Edit icon-start full-width left-aligned" onClick={(e) => {
                e.stopPropagation()
                setEditingBoardId(board._id)
                setEditedTitle(board.name)
                onCloseModal()
            }}>Rename</div>

            <div
                className={`star-toggle clickable size-32 icon-start clear select full-width left-aligned i-Favorite ${isStarred ? 'starred' : ''}`}
                onClick={handleChange} >
                {isStarred ? 'Remove from Favorites' : 'Add to Favorites'}
            </div>

            <div
                className="clickable clear size-32 icon-start full-width i-Delete full-width left-aligned"
                onClick={() =>
                    openGlobalModal(
                        <DeleteBoardModal
                            id={_id}
                            onRemoveBoard={onRemoveBoard}
                            closeGlobalModal={closeGlobalModal}
                        />
                    )
                }
            >
                Delete
            </div>
        </section>

    )
}
