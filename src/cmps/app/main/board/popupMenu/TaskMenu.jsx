// === Libs

import {  removeTask, updateBoard } from "../../../../../store/actions/board.actions"
import { showSuccessMsg } from "../../../../../services/base/event-bus.service"
import { useNavigate, useParams } from "react-router-dom"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function TaskMenu({ taskId }) {
    const { boardId } = useParams()
    // === Consts
const navigate = useNavigate()
    // === Effects


    // === Functions
    function handleCopy(link) {
        navigator.clipboard.writeText(link)
            .then(() => alert("Link copied!"))
            .catch(() => alert("Failed to copy link"));
    }



    return (
        <section className="task-popup-menu">
            <button className="clickable clear size-32 icon-start full-width left-aligned i-Open" onClick={()=> navigate(`${window.location.origin}/app/board/${boardId}/task/${taskId}`)}>Open item</button>
                <div className="divider"/>
            <button className="clickable clear size-32 i-Link icon-start full-width left-aligned" onClick={() => handleCopy(`${window.location.origin}/app/board/${boardId}/task/${taskId}`)}>Copy item link</button >
                <div className="clickable clear size-32 i-Edit icon-start full-width left-aligned" onClick={() => {
                    onCloseModal()
                }}>Rename</div>

                <div className="clickable clear  size-32 icon-start full-width i-Delete full-width left-aligned" onClick={() => {
                    removeTask(taskId)
                    showSuccessMsg('We successfully deleted 1 item')}}>
                    Delete
                </div>
        </section>
    )
}
