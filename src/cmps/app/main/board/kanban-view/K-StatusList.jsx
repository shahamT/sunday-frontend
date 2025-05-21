// === Libs


// === Services

// === Actions

// === Hooks / React
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

// === Imgs

// === Child Components
import { K_StatusPreview } from "./K_StatusPreview"
import { makeId } from "../../../../../services/base/util.service"

// ====== Component ======
// =======================

export function K_StatusList({ /* prop1, prop2 */ }) {
    // === Consts
    const board = useSelector(storeState => storeState.boardModule.board)
    const [statusCol, setStatusCol] = useState(null)
    const [tasksByStatus, setTasksByStatus] = useState(null)

    // === Effects
    useEffect(() => {
        if(!board) return
        const col = board.columns.find(col => col.type?.variant === 'status')
        setStatusCol(col)

    },[board])


    useEffect(() => {

        if(!statusCol) return
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

    const blankTasks = board.groups.flatMap(group =>
        group.tasks.filter(task => {
            const statusCv = task.columnValues.find(cv => cv.colId === statusCol.id)
            return !statusCv?.value || !statusCol.type.labels.some(label => label.id === statusCv.value)
        })
    )

    if (blankTasks.length) {
        tasksByStatusArray.push({
            id: makeId(),
            name: 'Blank',
            color: 'unselected-gray',
            tasks: blankTasks
        })
    }

        setTasksByStatus(tasksByStatusArray)
    },[statusCol])

    // === Functions
    

    if (!tasksByStatus) return <div>Loading...</div>
    return (
        <section className="K_StatusList">
            {tasksByStatus?.map(label => {
                return <K_StatusPreview key={label.id} label={label} />
            })}
        </section>
    )
}