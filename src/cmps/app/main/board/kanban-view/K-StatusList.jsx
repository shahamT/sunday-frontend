// === Libs


// === Services

// === Actions

// === Hooks / React
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

//  === DND
import { DndContext } from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable"

// === Imgs

// === Child Components
import { K_StatusPreview } from "./K_StatusPreview"
import { makeId } from "../../../../../services/base/util.service"
import { updateBoard } from "../../../../../store/actions/board.actions"

// ====== Component ======
// =======================

export function K_StatusList({ /* prop1, prop2 */ }) {
    // === Consts
    const board = useSelector(storeState => storeState.boardModule.board)
    const [statusCol, setStatusCol] = useState(null)
    const [tasksByStatus, setTasksByStatus] = useState(null)

    // === DND
    const [activeId, setActiveId] = useState(null)
    // === Effects
    useEffect(() => {
        if (!board) return
        const col = board.columns.find(col => col.type?.variant === 'status')
        setStatusCol(col)

    }, [board])


    useEffect(() => {

        if (!statusCol) return
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
    }, [statusCol])

    // === Functions

    function handleDragEnd(event) {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = tasksByStatus.findIndex(label => label.id === active.id)
        const newIndex = tasksByStatus.findIndex(label => label.id === over.id)

        const newOrder = arrayMove(tasksByStatus, oldIndex, newIndex)
        setTasksByStatus(newOrder)

        const newLabels = newOrder.map(({ id, name, color }) => ({ id, name, color }))
        const updatedBoard = {
            ...board,
            columns: board.columns.map(col =>
                col.id === statusCol.id
                    ? {
                        ...col,
                        type: {
                            ...col.type,
                            labels: newLabels,
                        },
                    }
                    : col
            ),
        }
        updateBoard(updatedBoard)
    }


    if (!tasksByStatus) return <div>Loading...</div>
    return (
        <DndContext
             onDragEnd={handleDragEnd }
            onDragStart={({ active }) => setActiveId(active.id)}
        >
            <SortableContext

                items={tasksByStatus.map(label => label.id)}
                strategy={rectSortingStrategy}
            >
                <section className="K_StatusList">
                    {tasksByStatus?.map(label => {
                        return <K_StatusPreview key={label.id} activeId={activeId} label={label} />
                    })}
                        
                </section>
            </SortableContext>
        </DndContext>
    )
}