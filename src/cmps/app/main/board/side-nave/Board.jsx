import React from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"
import { NavLink } from "react-router-dom";
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu";
import { SideNavModal } from "./SideNaveModal";
import { GlobalModal } from "../../../../reusables/GlobalModal/GlobalModal";


export const Board = ({ board, editedTitle, editingBoardId, setEditedTitle, setEditingBoardId, handleRename }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: board._id })
    const style = {
        transition,
        transform: transform ? CSS.Transform.toString(transform) : undefined,
    }

    return (
        <div className="board-item-nav" ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <NavLink
                to={`/app/board/${board._id}`}
                className="clickable select clear size-32  icon-start full-width left-aligned i-Board"
            >
                {editingBoardId === board._id ? (
                    <input
                        type="text"
                        value={editedTitle}
                        autoFocus
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={() => handleRename(board)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename(board)}
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
            </NavLink>
            <GlobalModal />
        </div>
    )
}
