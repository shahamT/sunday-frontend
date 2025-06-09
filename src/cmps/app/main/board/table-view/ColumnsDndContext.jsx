import { DndContext, DragOverlay } from "@dnd-kit/core"
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from "react"
import { T_ColumnHeaderCell } from "./T_ColumnHeaderCell"
import { T_ColumnBody } from "./T_ColumnBody"
import { moveColumns } from "../../../../../store/actions/board.actions"
import { closestCenter } from '@dnd-kit/core'


export function ColumnsDndContext({ setOverId, children, columns, group, board }) {
  const [activeId, setActiveId] = useState(null)

  const activeColumn = columns.find(col => col.id === activeId)



  function handleReorderColumns(newColumns, board) {
    const updatedBoard = { ...board, columns: newColumns }

    moveColumns(updatedBoard)

  }

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event

    if (!over || active.id === over.id) {
      setActiveId(null)
      setOverId(null)
      return
    }

    const oldIndex = columns.findIndex(col => col.id === active.id)
    const newIndex = columns.findIndex(col => col.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      setActiveId(null)
      setOverId(null)

      return
    }

    const newColumns = arrayMove(columns, oldIndex, newIndex)

    handleReorderColumns(newColumns, board)

    setActiveId(null)
  }


  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={(event) => handleDragEnd(event, columns, handleReorderColumns)}
      onDragOver={(event) => {
        const { over } = event
        setOverId(over?.id || null)
      }}
    >
      {children}

      <DragOverlay dropAnimation={null} >
        {activeColumn && (
          <div className="drag-column-overlay"
          >
            <T_ColumnHeaderCell column={activeColumn} groupId={group.id}  isDraggingOverlay={true} />
            {/* <T_ColumnBody column={activeColumn} group={group}  /> */}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}