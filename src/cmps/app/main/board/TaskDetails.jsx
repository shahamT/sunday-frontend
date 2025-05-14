// === Libs

// === Services
import { showErrorMsg } from "../../../../services/base/event-bus.service"
import { setColumnValue } from "../../../../store/actions/board.actions.js"

// === Actions

// === Hooks / React
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { EditableText } from '../../../../cmps/reusables/EditableText/EditableText.jsx'
import { useControlledInput } from '../../../../hooks/useControlledInput.js'


// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function TaskDetails() {
    // === Consts
    const navigate = useNavigate()
    const {boardId, taskId} = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    
    const [task, setTask] = useState(null)
    const [value, handleChange, reset, set] = useControlledInput('')
    
    // === Effects
    useEffect(() => {
        
        const foundTask = getTaskById(taskId)
        if (foundTask) {
            setTask(foundTask)
            set(foundTask.columnValues[0]?.value || '')
        }
    }, [board, taskId])

    useEffect(() => {
        set(task?.columnValues[0]?.value)
    }, [task])

    // === Functions
    function onCloseTaskDetails() {
        navigate(`/app/board/${boardId}`)
    }

    function onSetName() {
        if (!value.trim()) {
            showErrorMsg(`Task name can't be empty`)
            set(task?.columnValues[0]?.value || '')
            return
        }

        try {
            setColumnValue(taskId, task?.columnValues[0]?.colId, value)
            //set task?
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    function getTaskById(taskId) {
        
        for (const group of board?.groups || []) {
            for (const task of group.tasks) {
                if (task.id === taskId) return task
            }
        }
        return null
    }

    if (!task) return <div>Loading...</div>
    return (
        <section className="TaskDetails">
            <EditableText
                    value={value}
                    full={true}
                    size="title"
                    handleChange={handleChange}
                    onBlur={onSetName}
                    onPressEnter={onSetName}
                />
            <button onClick={onCloseTaskDetails}>X</button>
        </section>
    )
}