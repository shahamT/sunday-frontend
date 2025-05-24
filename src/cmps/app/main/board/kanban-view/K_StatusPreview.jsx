// === Libs

import { K_TaskPreview } from "./K_TaskPreview"

//  === DND
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function K_StatusPreview({ label, activeId }) {
    // === Consts
    //  === DND 
  

    const { attributes, listeners, setNodeRef, transform, transition,isDragging } = useSortable({
        id: label.id,
        activationConstraint: {
          delay: 250,
          tolerance: 5
        }
      })
    
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: transform ? 999 : 'auto',
        opacity: isDragging ? 0.98 : 1,
    
    }

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_StatusPreview" style={style} ref={setNodeRef}>

            {/* **************label header*************** */}
            <div className={`status-header ${label.color}-bg-static ${isDragging ? 'dragging' : ''}`}  {...attributes} {...listeners}>
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
                <button className="add-task-btn clickable clear size-32 icon-start i-AddSmall">Add item</button>
            </div>
            
        </section>
    )
}