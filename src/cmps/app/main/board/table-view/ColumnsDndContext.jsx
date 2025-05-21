import { DndContext, DragOverlay } from "@dnd-kit/core"
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from "react"
import { T_ColumnHeaderCell } from "./T_ColumnHeaderCell"
import { T_ColumnBody } from "./T_ColumnBody"
import { updateBoard, updateBoards } from "../../../../../store/actions/board.actions"
import { useSelector } from "react-redux"

export function ColumnsDndContext({ children, columns, group,board }) {
  const [activeId, setActiveId] = useState(null)
  const activeColumn = columns.find(col => col.id === activeId)


  function handleReorderColumns(newColumns,board) {
    // console.log("ssssss",newColumns)
    const updatedBoard = { ...board, columns: newColumns }
    updateBoard(updatedBoard)
  }

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event

    if (!over || active.id === over.id) {
      setActiveId(null)
      return
    }

    const oldIndex = columns.findIndex(col => col.id === active.id)
    const newIndex = columns.findIndex(col => col.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      setActiveId(null)
      return
    }

    const newColumns = arrayMove(columns, oldIndex, newIndex)

    handleReorderColumns(newColumns)

    setActiveId(null)
  }


  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={(event) => handleDragEnd(event, columns, handleReorderColumns)}>
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