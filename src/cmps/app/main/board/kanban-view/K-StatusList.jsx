// === Libs


// === Services

// === Actions

// === Hooks / React
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

// === Imgs

// === Child Components
import { K_StatusPreview } from "./K_StatusPreview"

// ====== Component ======
// =======================

export function K_StatusList({ /* prop1, prop2 */ }) {
    // === Consts
    const board = useSelector(storeState => storeState.boardModule.board)
    const [statusCol, setStatusCol] = useState(null)
    const [tasksByStatus, setTasksByStatus] = useState(null)

    console.log(tasksByStatus)

    // === Effects
    useEffect(() => {
        if(!board) return
        const col = board.columns.find(col => col.type?.variant === 'status')
        setStatusCol(col)

        if(!col) return
        const tasksByStatusArray = statusCol.type.labels.map(label => {
        const tasks = board.groups.flatMap(group =>
            group.tasks.filter(task => {
                const statusCv = task.columnValues.find(cv => cv.colId === statusCol.id)
                return statusCv?.value === label.id
            })
        )

        return {
            ...label,
            tasks
        }
    })

        setTasksByStatus(tasksByStatusArray)
    },[board])

    // === Functions
    

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_StatusList">
            {tasksByStatus.labels.map(label => {
                return <K_StatusPreview key={label.id} label={label} />
            })}
        </section>
    )
}