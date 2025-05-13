import React from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"
import { NavLink, useNavigate } from "react-router-dom";
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu";
import { SideNavModal } from "./SideNaveModal";
import { GlobalModal } from "../../../../reusables/GlobalModal/GlobalModal";


export const BoarNavBarLink = ({ board, editedTitle, editingBoardId, setEditedTitle, setEditingBoardId, handleRename }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: board._id })
    const navigate = useNavigate()

    


    function handleClick(ev) {
        ev.stopPropagation()
        navigate(`/app/board/${board._id}`)
      }

    const style = {
        transition,
        transform: transform ? CSS.Transform.toString(transform) : undefined,
    }

    return (
        // <div className="board-item-nav">
        <div
        className="board-item-nav"
        ref={setNodeRef}
        // {...attributes}
        // {...listeners}
        style={style}
      >
         <div className="drag-handle" {...attributes} {...listeners} />
        <div
          className="clickable select clear size-32 icon-start full-width left-aligned i-Board"
          onClick={handleClick}
          draggable={false}
        >
          {editingBoardId === board._id ? (
            <input
              type="text"
              value={editedTitle}
              autoFocus
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={() => handleRename(board)}
              onKeyDown={(e) => e.key === "Enter" && handleRename(board)}
              className="edit-board-input"
            />
          ) : (
            board.name
          )}
  
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
            <div className="Menu-btn clickable clear size-24 icon-btn i-Menu" />
          </PopUpMenu>
        </div>
        <GlobalModal />
      </div>
    )
}
