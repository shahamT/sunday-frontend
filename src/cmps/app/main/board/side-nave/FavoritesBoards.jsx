

// === Libs

import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { SideNavModal } from "./SideNaveModal"

// === Services

// === Actions

// === Hooks / React

export function FavoritesBoards({ boards,setEditedTitle,editingBoardId ,handleRename,editedTitle,setEditingBoardId}) {
    const starredBoards = boards.filter(board => board.isStarred )


    if (starredBoards.length===0) return <div className="favorites-boards ">No Favorites</div>
    return (
        <section className="favorites-boards">
        {starredBoards.map(board => (
         <div key={board._id} className="board-item-nav">
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
           <>
             <div className="board-link-container">
               <NavLink
                 to={`/app/board/${board._id}`}
                 className="clickable select clear size-32 icon-start full-width left-aligned i-Board"
               >
                 {board.name}
               </NavLink>
             </div>
       
             <div className="board-menu-container" onClick={(ev) => {
               ev.stopPropagation();
               ev.preventDefault();
             }}>
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
           </>
         )}
       </div>
       

        ))}
      </section> )
   
        }