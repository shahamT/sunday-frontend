// === Libs
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// === Hooks / React
import { useEffect, useRef, useState } from 'react'

// === Child Components
import { PopUpMenu } from '../../../../reusables/PopUpMenu/PopUpMenu'
import { TaskMenu } from '../popupMenu/TaskMenu'
import { T_Cell } from './T_Cell'
import { useOutletContext } from 'react-router-dom'

// ====== Component ======
// =======================

export function T_TaskRow({ task, columns, group, isOverlay = false, isBuffer = false, liveColumnWidthsRef }) {
  // === Consts
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { sideNavWidth } = useOutletContext()

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
    zIndex: isOverlay ? 1000 : 'auto',
    pointerEvents: isOverlay ? 'none' : 'auto',
  }

  // ==== drag and drop buffers for beautifull transition between groups ====
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


  //  === task menu position on mount and while scrolling ===
  const indicatorRef = useRef();
  const [menuPos, setMenuPos] = useState(null);

  useEffect(() => {
    function updatePos() {
      if (!indicatorRef.current) return;
      const rect = indicatorRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.top,
        left: rect.left - 40,
      });
    }

    updatePos();

    window.addEventListener('scroll', updatePos, true);
    window.addEventListener('resize', updatePos);
    return () => {
      window.removeEventListener('scroll', updatePos, true);
      window.removeEventListener('resize', updatePos);
    };
  }, [isDragging, transform, group, sideNavWidth]);



  return (
    <article
      ref={setNodeRef}
      className={`T_TaskRow ${isMenuOpen ? 'menu-in-focus' : ''} ${isDragging ? 'dragging' : ''} ${isOverlay ? 'overlay' : ''}`}
      style={style}
      {...attributes}
    >

      <div className={`t-left-indicator ${group.color}-bg-static`} ref={indicatorRef} >
        <div className="menu-container"
          style={{
            position: 'fixed',
            top: menuPos?.top ?? 0,
            left: menuPos?.left ?? 0,
          }}
        >
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
      </div>

      {columns.map((column, idx) => {
        const columnValue = task.columnValues.find(cv => cv.colId === column.id)
        return (
          <T_Cell
            key={column.id + idx}
            column={column}
            columnValue={columnValue}
            task={task}
            groupId={group.id}
            listeners={listeners}
            isOverlay={isOverlay}
            liveColumnWidthsRef={liveColumnWidthsRef}
          />
        )
      })}

      <div className="empty-last-cell"></div>

    </article>
  )
}
