import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { T_Cell } from './Demo-T_Cell'

// ====== T_TaskRow Component ======
// =================================

export function T_TaskRow({ task, columns, group, }) {

    // ==== drag and drop ====
    const {
        attributes,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: `${task.id}|${group.id}` })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isOverlay ? 1000 : 'auto',
        pointerEvents: isOverlay ? 'none' : 'auto',
    }

    if (isBuffer) {
        return (
            <article
                ref={setNodeRef}
                className="T_TaskRow buffer"
                style={{
                    height: '0px',
                    padding: 0,
                    border: 'none',
                    pointerEvents: 'none',
                    opacity: 0,
                }}
                {...attributes}
            />
        )
    }

    return (
        <article className={`T_TaskRow ${isDragging ? 'dragging' : ''}`}>

            {/* ==== Task-row rendering ==== */}

            {columns.map((column, idx) => {
                const columnValue = task.columnValues.find(cv => cv.colId === column.id)
                return (
                    <T_Cell
                        key={column.id + idx}
                        column={column}
                        columnValue={columnValue}
                        task={task}
                        groupId={group.id}
                    />
                )
            })}

        </article>
    )
}