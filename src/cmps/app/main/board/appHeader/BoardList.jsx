// === Libs

import { useSelector } from "react-redux"
import { AddBoardModal } from "../side-nave/AddBoardModal"
import { useNavigate } from "react-router-dom"
import { IsStarred } from "../value-setter/IsStarred"
import { useState } from "react"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================



export function BoardList({ /* prop1, prop2 */ }) {
    // === Consts
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [isRecentlyVisitedOpen, setIsRecentlyVisitedOpen] = useState(true)

    const navigate = useNavigate()
    // === Effects
    const workManagement = 'work management > Main workspace'
    // === Functions

    return (
        <section className="board-list">
            <div className="recently-visited-wraper" onClick={()=> setIsRecentlyVisitedOpen(prev => !prev)}>
                {isRecentlyVisitedOpen ? (<span className="dropdown-icon left-aligned i-DropdownChevronDown " />) : (<span className="dropdown-icon left-aligned i-DropdownChevronUp" />)}
                Recently visited
            </div>
{isRecentlyVisitedOpen ? 
            <section className="board-preview-container">
                {boards.length > 0 ? boards.map(board =>
                    <article key={board._id} className="board-preview" onClick={() => navigate(`/app/board/${board._id}`)}>
                        <div className="img-wrapper">
                            <img src="https://res.cloudinary.com/ditvgrfxq/image/upload/v1747320341/kkvc6y2yzsy9taa4d7y2.png" alt="Monday board" />
                        </div>
                        <div className="board-txt-container clickable select size-32 icon-start full-width i-Board">
                            <label className="board-txt">
                                {board.name}

                            </label>
                            <button
                                className={`favorite-btn clickable select size-32 ${board.isStarred ? 'starred' : ''}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <IsStarred board={board} />
                            </button>



                        </div>
                        <div className="board-work-management">
                            <img className="monday-icon" src="https://res.cloudinary.com/ditvgrfxq/image/upload/v1747472186/pdaj4ymmpllwsrftlivp.png" alt="" />
                            <p>{workManagement}</p>
                        </div>


                    </article>
                )

                    : <p>No boards to show. lets create a new one! <button onClick={() => openGlobalModal(<AddBoardModal closeGlobalModal={closeGlobalModal} />)}>Create new board</button></p>
                }
            </section >
            : null}
        </section >
    )
}