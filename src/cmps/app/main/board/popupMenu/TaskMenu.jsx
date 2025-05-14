// === Libs

import { useEffect, useState } from "react"
import { loadBoards, removeBoard, removeTask, updateBoard } from "../../../../../store/actions/board.actions"
import { showSuccessMsg } from "../../../../../services/base/event-bus.service"
import { useParams } from "react-router-dom"

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

    // === Effects


    // === Functions
    function handleCopy(link) {
        navigator.clipboard.writeText(link)
            .then(() => alert("Link copied!"))
            .catch(() => alert("Failed to copy link"));
    }



    return (
        <section className="task-popup-menu">
            <a href={`${window.location.origin}/app/board/${boardId}/task/${taskId}`}
                className="clickable clear size-32 icon-start full-width left-aligned i-Open" target="_blank" rel="noopener noreferrer">Open item</a>
                <div className="divider" />
            <button className="clickable clear size-32 i-Link icon-start full-width left-aligned" onClick={() => handleCopy(`${window.location.origin}/app/board/${boardId}/task/${taskId}`)}>Copy item link</button >
                <div className="clickable clear size-32 i-Edit icon-start full-width left-aligned" onClick={() => {
                    onCloseModal()
                }}>Rename</div>



                <div className="clickable clear  size-32 icon-start full-width i-Delete full-width left-aligned" onClick={() => removeTask(taskId)}>
                    Delete
                </div>
        </section>
    )
}
