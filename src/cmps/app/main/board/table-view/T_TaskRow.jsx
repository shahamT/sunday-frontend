// === Libs
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// === Hooks / React
import { useState } from 'react'

// === Child Components
import { PopUpMenu } from '../../../../reusables/PopUpMenu/PopUpMenu'
import { TaskMenu } from '../popupMenu/TaskMenu'
import { T_Cell } from './T_Cell'

// ====== Component ======
// =======================

export function T_TaskRow({ task, columns, group }) {
  // === Consts
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: `${task.id}|${group.id}` })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto'
  }

  return (
    <article
      ref={setNodeRef}
      className={`T_TaskRow ${isMenuOpen ? 'menu-in-focus' : ''} ${isDragging ? 'dragging' : ''}`}
      style={style}
      {...attributes}
    >

      <div className="menu-container">
        <div className="menu-wraper">
          <PopUpMenu
            position="bottom-start"
            onOpen={() => setIsMenuOpen(true)}
            onClose={() => setIsMenuOpen(false)}
            renderContent={({ onCloseModal }) => (
              <TaskMenu
                onCloseModal={onCloseModal}
                taskId={task.id}
                groupId={group.id}
              />
            )}
          >
            <div className={`menu-btn clickable clear size-24 icon-btn i-Menu ${isMenuOpen ? 'in-focus' : ''}`} />
          </PopUpMenu>
        </div>
      </div>

      <div className={`t-left-indicator ${group.color}-bg`} />

      {columns.map((column, idx) => {
        const columnValue = task.columnValues.find(cv => cv.colId === column.id)
        return (
          <T_Cell
            key={column.id + idx}
            column={column}
            columnValue={columnValue}
            taskId={task.id}
            groupId={group.id}
            listeners={listeners}
          />
        )
      })}
      
      <div className="empty-last-cell"></div>

    </article>
  )
}
