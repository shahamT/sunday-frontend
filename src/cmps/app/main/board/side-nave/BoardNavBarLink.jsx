// import React from "react";
import React, { useEffect, useRef } from "react";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"
import { useNavigate } from "react-router-dom";
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu";
import { SideNavModal } from "./SideNaveModal";


export const BoardNavBarLink = ({ boardId, board, editedTitle, editingBoardId, setEditedTitle, setEditingBoardId, handleRename, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: board._id })
  const navigate = useNavigate()
  const clickTimeRef = useRef(null)
  const inputRef = useRef(null)

// sss

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
    navigate(`/app/board/${board._id}`)

    // const elapsed = Date.now() - clickTimeRef.current
    // if (elapsed < 200) {
    //   navigate(`/app/board/${board._id}`)
    // }
  }

  function handleMouseDown() {
    clickTimeRef.current = Date.now()
  }





  return (
    <div
      className="board-item-nav BoardNavBarLink"
      ref={setNodeRef}
      {...(editingBoardId !== board._id ? { ...attributes, ...listeners } : {})}
      style={style}
    >
  
      <div
        className={`board-btn clickable select clear size-32 icon-start full-width left-aligned i-Board ${boardId === board._id ? `active` : null}`}
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

        <div className="menu-btn-wraper">
          <PopUpMenu
            position="start-end"
            renderContent={({ onCloseModal }) => (
              <SideNavModal
                onCloseModal={onCloseModal}
                board={board}
                setEditingBoardId={setEditingBoardId}
                setEditedTitle={setEditedTitle}
              />
            )}
          >
            <div className="menu-btn clickable clear size-24 icon-btn i-Menu" />
          </PopUpMenu>
        </div>
      </div>
    </div>
  )
}
