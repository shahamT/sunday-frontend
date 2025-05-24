// === Libs

//  === DND
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
// === Services

// === Actions

// === Hooks / React
import { useState } from "react"

// === Imgs

// === Child Components

// ====== Component ======
import { K_TaskPreview } from "./K_TaskPreview"
import { showErrorMsg } from "../../../../../services/base/event-bus.service"
import { addTask, setColumnValue } from "../../../../../store/actions/board.actions"

// =======================

export function K_StatusPreview({ label, activeId, board, colId }) {
    // === Consts
    const [isInput, setIsInput] = useState(false)
    const [value, setValue] = useState('')

    //  === DND 
    const { attributes, listeners, setNodeRef, transform, transition,isDragging } = useSortable({ id: label.id })
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: transform ? 999 : 'auto',
        opacity: isDragging ? 0.98 : 1,
    
    }

    // === Effects

    // === Functions
    function onAddTask({ target }) {
        const val = target.value
        setIsInput(false)
        setValue('')

        if (val.trim()) {
            try {
                addTask({valueToSave: value, groupId: board.groups[0].id, columnValue:{colId, value: label.id}})
            }
            catch (err) {
                showErrorMsg(`Somthing went wrong`)
                setIsInput(true)
                setValue(value)
            }
        }
    }

    function handleChange({ target }) {
        setValue(target.value)
    }

    function onHandleEnter(e) {
        if (e.key === 'Enter') {
            onAddTask(e);
        }

    }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_StatusPreview" style={style} ref={setNodeRef}>

            {/* **************label header*************** */}
            <div className={`status-header ${label.color}-bg-static ${isDragging ? 'dragging' : ''}`} {...attributes} {...listeners}>
                <span className="name">{label.name || 'Blank'}</span>
                <span className="amount">{label.tasks.length}</span>
            </div>

            {/* **************tasks*************** */}
            <div className="status-body">
                <div className="tasks">
                    {label.tasks.map(task => {
                        return <K_TaskPreview key={task.id} task={task} />
                    })}
                </div>
            </div>

            <div className="add-btn-container">

                {isInput 
                ? ( 
                    <div className={`add-item-input`}>
                        <input type="text" value={value} placeholder="+ Add item" onBlur={onAddTask} onChange={handleChange} onKeyDown={onHandleEnter} autoFocus/>
                         
                    </div>
                )
                : (<button className="add-task-btn clickable clear size-32 select" onClick={() => setIsInput(true)}>+ Add item</button> )}

            </div>
            
        </section>
    )
}