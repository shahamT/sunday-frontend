// import React from "react";
import React, { useEffect, useRef, useState } from "react";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu";
import { BoardMenu } from "../popupMenu/BoardMenu";
import { updateUser } from "../../../../../store/actions/user.actions";


export const BoardNavBarLink = ({ board, editedTitle, editingBoardId, setEditedTitle, setEditingBoardId, handleRename, handleMobileClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isOver, isDragging, } = useSortable({ id: board._id })
  const navigate = useNavigate()
  const clickTimeRef = useRef(null)
  const inputRef = useRef(null)
  const { boardId } = useParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const wasDragged = useRef(false)

  const location = useLocation();
  const isKanbanRoute = location.pathname.endsWith('/kanban');


  const style = {
    transition,
    transform: transform ? CSS.Transform.toString(transform) : undefined,
  }

  useEffect(() => {
    if (editingBoardId === board._id && inputRef.current) {
      inputRef.current.select()
    }
  }, [editingBoardId])

  function handleClick() {
    if (!wasDragged.current) {
      if (isKanbanRoute) {
        navigate(`/app/board/${board._id}/kanban`)
      } else {
        navigate(`/app/board/${board._id}`)
      }
    }
  }

  function handleMouseDown() {
    clickTimeRef.current = Date.now()
    wasDragged.current = false
  }

  function handleDragStart() {
    wasDragged.current = true
  }

  return (
    <div
      className={`BoardNavBarLink ${isOver ? 'drag-over' : ''} ${isDragging ? 'dragging' : ''} ${isMenuOpen ? 'in-focus' : ''}`}
      ref={setNodeRef}
      {...(editingBoardId !== board._id ? { ...attributes, ...listeners } : {})}
      style={style}
      onDragStart={handleDragStart}
      onClick={handleMobileClick}
    >
      <div
        className={`board-btn clickable select clear size-32 icon-start full-width left-aligned i-Board ${boardId === board._id ? `active` : null} ${isMenuOpen ? 'in-focus' : ''}`}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        draggable={false}
      >
        {editingBoardId === board._id ? (
          <input
            ref={inputRef}
            type="text"
            value={editedTitle}
            autoFocus
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={() => handleRename(board)}
            onKeyDown={(e) => e.key === "Enter" && handleRename(board)}
            className="edit-board-input"
          />
        ) : (
          <div className="text-wraper">
            <p>{board.name}</p>
          </div>
        )}

        <div className={`menu-btn-wraper ${isMenuOpen ? 'in-focus' : ''}`}>
          <PopUpMenu
            position="bottom-start"
            onOpen={() => setIsMenuOpen(true)}
            onClose={() => setIsMenuOpen(false)}
            renderContent={({ onCloseModal }) => (
              <BoardMenu
                onCloseModal={onCloseModal}
                board={board}
                setEditingBoardId={setEditingBoardId}
                setEditedTitle={setEditedTitle}
              />
            )}
          >
            <div className={`menu-btn clickable clear size-24 icon-btn i-Menu ${isMenuOpen ? 'in-focus' : ''}`} />
          </PopUpMenu>

        </div>
      </div>
    </div>
  )
}
