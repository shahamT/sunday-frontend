import { DndContext, DragOverlay } from "@dnd-kit/core"
import { useState } from "react"
import { T_ColumnHeaderCell } from "./T_ColumnHeaderCell"
import { T_ColumnBody } from "./T_ColumnBody"

export function ColumnsDndContext({ children, columns, group }) {
    const [activeId, setActiveId] = useState(null)
    const activeColumn = columns.find(col => col.id === activeId)
  
    function handleDragStart(event) {
      setActiveId(event.active.id)
    }
  
    function handleDragEnd(event) {
      setActiveId(null)
    }
  
    return (
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {children}
  
        <DragOverlay dropAnimation={null}>
          {activeColumn && (
            <div className="drag-column-overlay">
              <T_ColumnHeaderCell column={activeColumn} groupId={group.id} />
              <T_ColumnBody column={activeColumn} group={group} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    )
  }