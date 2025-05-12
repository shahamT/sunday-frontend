

// === Libs

import { useEffect } from "react"
import { NavLink } from "react-router-dom"

// === Services

// === Actions

// === Hooks / React

// === Imgs
// === Child Components
// ====== Component ======
// =======================

export function FavoritesBoards({ boards }) {
    const starredBoards = boards.filter(board => { board.isStarred })
    console.log(starredBoards.length)
    // === Consts

    // === Effects
   

    // === Functions


    if (starredBoards.length===0) return <div className="favorites-boards ">No Favorits</div>
    return (
        <section className="favorites-boards ">
        {starredBoards.map(board => (
          <div key={board._id} className="board-item-nav">
            <NavLink
              to={`/app/board/${board._id}`}
              className="clickable select clear size-32 i-Board icon-start full-width left-aligned"
            >
              {board.name}
            </NavLink>
          </div>
        ))}
      </section>
    )
        }