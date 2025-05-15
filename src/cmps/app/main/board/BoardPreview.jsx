// === Libs


// === Services

// === Actions
import { loadBoard } from "../../../../store/actions/board.actions";

// === Hooks / React
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelected } from '../../../../hooks/useSelected.js'


// === Imgs

// === Child Components
import { BoardHeader } from "./BoardHeader";
import { BoardContent } from "./BoardContent";
import { TaskPanel } from "./TaskPanel";
import { TaskDetails } from "./task-details/TaskDetails";

// ====== Component ======
// =======================

export function BoardPreview({ /* prop1, prop2 */ }) {
    // === Consts
    const { boardId } = useParams()
    const { selected, isSelected, select } = useSelected('main-table')

    // === Effects
    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="BoardPreview">
            <BoardHeader isSelected={isSelected} select={select} />
            <BoardContent />

            <TaskPanel
                side='right'
                defaultWidth={500}
                minWidth={200}
                maxWidth={700}
            >
                <TaskDetails />
            </TaskPanel>
        </section>
    )
}