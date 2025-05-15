// === Libs

import { removeTask } from "../../../../../store/actions/board.actions"
import { showSuccessMsg } from "../../../../../services/base/event-bus.service"
import { useNavigate, useParams } from "react-router-dom"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
// ====== Component ======
// =======================

export function TaskMenu({ taskId, groupId, isTaskOpen }) {
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


    async function onRemoveTask() {
        try {
            await removeTask(taskId, groupId)
            showSuccessMsg(`Successfully deleted 1 item.`)
        }
        catch (err) {
            showErrorMsg('Something went wrong')
        }
    }

    return (
        <section className="task-popup-menu">
            {isTaskOpen && <>
                <button className="clickable clear size-32 icon-start full-width left-aligned i-Open" onClick={() => navigate(`/app/board/${boardId}/task/${taskId}`)}>Open item</button>
                <div className="divider" />
            </>
            }

            <button className="clickable clear size-32 i-Link icon-start full-width left-aligned" onClick={() => handleCopy(`${window.location.origin}/app/board/${boardId}/task/${taskId}`)}>Copy item link</button >
            {isTaskOpen &&
                <>
                    <div className="clickable clear size-32 i-Edit icon-start full-width left-aligned" onClick={() => {
                        onCloseModal()
                    }}>Rename</div>
                </>
            }

            <div className="clickable clear  size-32 icon-start full-width i-Delete full-width left-aligned" onClick={onRemoveTask}>
                Delete
            </div>
        </section>
    )
}
