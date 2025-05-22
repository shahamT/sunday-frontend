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

export function K_StatusList({ setForSum }) {
    // === Consts
    // const board = useSelector(storeState => storeState.boardModule.board)
    const storeBoard = useSelector(storeState => storeState.boardModule.board)
    const [statusCol, setStatusCol] = useState(null)
    const [board, setBoard] = useState(null)
    const [tasksByStatus, setTasksByStatus] = useState(null)
    const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

    // === DND
    const [activeId, setActiveId] = useState(null)
    // === Effects
    useEffect(() => {
        if(!storeBoard) return
        const col = storeBoard.columns.find(col => col.type?.variant === 'status')
        setStatusCol(col)

    },[storeBoard])

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
            // const groupNameMatches = regex?.test(group.name)
            const matchingTasks = group.tasks.filter(task => {
                let matchesTasks = true
                let matchesPerson = true
                
                if (regex) {
                    const taskName = task.columnValues[0]?.value || ''
                    matchesTasks = regex.test(taskName) ? true : false
                    // matchesText = groupNameMatches || taskMatches
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
        
        setBoard({...storeBoard, groups: filteredGroups})
        
    }, [filterBy, storeBoard])
    
    useEffect(() => {
        if(!board) return

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
        }})

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
        if (blankTasks.length) {
            tasksByStatusArray.push({
                id: makeId(),
                name: 'Blank',
                color: 'unselected-gray',
                tasks: blankTasks
            })
        }

        const totalTasks = board.groups.reduce((acc, group) => acc + group.tasks.length, 0)
        setTasksByStatus(tasksByStatusArray)
        sendLabelIds(tasksByStatusArray, totalTasks)
    },[statusCol, board])
    
    // === Functions
    function sendLabelIds(tasksBy, totalTasks) {
        const onlyColumnValues = tasksBy.map(label => label.id)

        setForSum(onlyColumnValues, statusCol, totalTasks)
    }
    
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