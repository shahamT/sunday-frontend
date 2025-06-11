// === Libs

// === Services

// === Actions

// === Hooks / React
import { useEffect } from "react"
import { useSelector } from "react-redux"

// === Imgs

// === Child Components
import { ActivityLogRow } from "./ActivityLogRow"

// ====== Component ======
// =======================

export function TaskDetailsActivityLog({ task, board }) {
    // === Consts
    const activities = useSelector(storeState => storeState.boardModule.board.activities)
    
    // === Effects
    useEffect(() => {

    },[activities])

    // === Functions

    return (
        <section className="TaskDetailsActivityLog slim-scroll">

            {activities?.map(activity => {
                if(activity.taskId === task.id) {
                   return <ActivityLogRow key={activity.id} activity={activity} task={task} board={board} />
                }
            })}

        </section>
    )
}