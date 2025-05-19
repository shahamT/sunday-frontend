// === Libs

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ActivityLogRow } from "./ActivityLogRow"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function TaskDetailsActivityLog({ task, board }) {
    // === Consts
    const activities = useSelector(storeState => storeState.boardModule.board.activities)
    // === Effects
    useEffect(() => {

    },[activities])

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="TaskDetailsActivityLog">
            {/* <h1>
                <pre>{JSON.stringify(activities, null, 2)}</pre>
            </h1> */}
            {activities.map(activity => (
                <ActivityLogRow key={activity.id} activity={activity} task={task} board={board} />
            ))}

        </section>
    )
}