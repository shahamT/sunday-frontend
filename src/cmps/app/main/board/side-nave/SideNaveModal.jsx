// === Libs

import { useEffect, useState } from "react"
// import { debounce } from "../../../../../services/base/util.service"
import { loadBoard, loadBoards, removeBoard, updateBoard } from "../../../../../store/actions/board.actions"
import { showSuccessMsg } from "../../../../../services/base/event-bus.service"
// import { h1 } from "remirror/dist/_tsup-dts-rollup"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function SideNavModal({ board, setEditingBoardId, setEditedTitle, onCloseModal }) {

    // === Consts
    const [boardToEdit, setBoardToEdit] = useState(null)
    // const debounceOnSetTxtToEdit = useRef(debounce(setTxtToEdit, 200))

    // === Effects
    useEffect(() => {
        setBoardToEdit(board)

        return () => {
            setBoardToEdit(null);
        }
    }, [board])


    // === Functions
    function handleChange({ target }) {
        const updatedBoard = {
            ...boardToEdit,
            isStarred: !boardToEdit.isStarred

        }
        setBoardToEdit(updatedBoard)
        updateBoard(updatedBoard)
            .then(()=>loadBoards())
            .catch(err => console.error('Failed to update board', err));
    }

    function onRemoveBoard(boardId){
        removeBoard(boardId)
        .then(showSuccessMsg('We successfully deleted the board'))
        .catch('Failed to remove board', err)

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
            <div className="divider1" />
            <div className="clickable clear size-32 i-Edit icon-start full-width left-aligned" onClick={() => {
                setEditingBoardId(board._id)
                setEditedTitle(board.name)
                onCloseModal()
            }}>Rename</div>

            <div
                className={`star-toggle clickable size-32 icon-start clear select full-width left-aligned i-Favorite ${isStarred ? 'starred' : ''}`}
                onClick={handleChange} >
                {isStarred ? 'Remove from Favorites' : 'Add to Favorites'}
            </div>

            <div className="clickable clear  size-32 icon-start full-width i-Delete full-width left-aligned" onClick={() => onRemoveBoard(_id)}>
                Delete
            </div>
        </section>
    )
}
