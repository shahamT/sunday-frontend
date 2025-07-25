// === Libs
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor, } from "@dnd-kit/core"
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

// === Services

// === Actions
import { updateBoard } from "../../../../../store/actions/board.actions"

// === Hooks / React
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

// === Imgs

// === Child Components
import { K_StatusPreview } from "./K_StatusPreview"

// ====== Component ======
// =======================

export function K_StatusList({ setForSum }) {
    // === Consts
    const storeBoard = useSelector(storeState => storeState.boardModule.board)
    const [statusCol, setStatusCol] = useState(null)
    const [board, setBoard] = useState(null)
    const [tasksByStatus, setTasksByStatus] = useState(null)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

    // === DND
    const [activeId, setActiveId] = useState(null)
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    // === Effects
    useEffect(() => {
        if (!storeBoard) return
        const col = storeBoard.columns.find(col => col.type?.variant === 'status')
        setStatusCol(col)

    }, [storeBoard])

    useEffect(() => {
        if (!storeBoard) return

        const regex = filterBy.txt ? new RegExp(filterBy.txt, 'i') : null
        const peopleCol = storeBoard.columns.find(col => col.type?.variant === 'people')
        const personId = filterBy.person

        if (!regex && !personId) {
            setBoard(storeBoard)
            return
        }

        const filteredGroups = storeBoard.groups.map(group => {
            const matchingTasks = group.tasks.filter(task => {
                let matchesTasks = true
                let matchesPerson = true

                if (regex) {
                    const taskName = task.columnValues[0]?.value || ''
                    matchesTasks = regex.test(taskName) ? true : false
                }

                if (personId && peopleCol) {
                    matchesPerson = task.columnValues.some(cv =>
                        cv.colId === peopleCol.id &&
                        Array.isArray(cv.value) &&
                        cv.value.some(user => user._id === personId)
                    )
                }
                return matchesTasks && matchesPerson
            })

            if (matchingTasks?.length) {
                return {
                    ...group,
                    tasks: matchingTasks
                }
            }

            return null
        }).filter(Boolean)

        setBoard({ ...storeBoard, groups: filteredGroups })

    }, [filterBy, storeBoard])

    useEffect(() => {
        if (!board) return

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
                id: 'blankId',
                name: 'Blank',
                color: 'unselected-gray',
                tasks: blankTasks
            })
        } else {
            tasksByStatusArray.push({
                id: 'blankId',
                name: 'Blank',
                color: 'unselected-gray',
                tasks: []
            })
        }

        const totalTasks = board.groups.reduce((acc, group) => acc + group.tasks.length, 0)
        setTasksByStatus(tasksByStatusArray)
        sendLabelIds(tasksByStatusArray, totalTasks)
    }, [statusCol, board])

    // === Functions
    function sendLabelIds(tasksBy, totalTasks) {
        const repeatedLabelIds = tasksBy
            .filter(label => label.tasks.length > 0)
            .flatMap(label => Array(label.tasks.length).fill(label.id))

        setForSum(repeatedLabelIds, statusCol, totalTasks)
    }

    function handleDragEnd(event) {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = tasksByStatus.findIndex(label => label.id === active.id)
        const newIndex = tasksByStatus.findIndex(label => label.id === over.id)

        const newOrder = arrayMove(tasksByStatus, oldIndex, newIndex)
        setTasksByStatus(newOrder)

        const newLabels = newOrder
        .filter(({ id }) => id !== 'blankId')
        .map(({ id, name, color }) => ({ id, name, color }))

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

    if (!tasksByStatus) return <div className="main-loader-container" >
    <img className="loader" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747552268/loader_cymybj.gif" alt="loader" />
     </div>

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={({ active }) => setActiveId(active.id)}
        >
            <SortableContext

                items={tasksByStatus.map(label => label.id)}
                strategy={rectSortingStrategy}
            >
                <section className="K_StatusList">
                    {tasksByStatus?.map(label => {
                        return <K_StatusPreview key={label.id} activeId={activeId} label={label} board={storeBoard} colId={statusCol.id} />
                    })}

                </section>
            </SortableContext>
        </DndContext>
    )
}