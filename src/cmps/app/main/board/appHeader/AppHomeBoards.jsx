// === Libs

import { useSelector } from "react-redux"
import { AddBoardModal } from "../side-nave/AddBoardModal"
import { useNavigate } from "react-router-dom"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function AppHomeBoards({ /* prop1, prop2 */ }) {
    // === Consts
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const navigate = useNavigate()
    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="app-home-boards">

            {boards.length > 0 ? boards.map(board =>
                <div key={board._id} className="board-preview" onClick={() => navigate(`/app/board/${board._id}`) }>
                    <div className="img-wrapper">
                        <img src="https://res.cloudinary.com/ditvgrfxq/image/upload/v1747320341/kkvc6y2yzsy9taa4d7y2.png" alt="Monday board" />
                    </div>
                    <div className="board-prev clickable select size-32 icon-start left-aligned i-Board"
                        
                       >
                        <p>{board.name}</p>
                        <div className={`favorite-btn clickable select size-32 icon-start left-aligne i-Favorite  ${board.isStarred ? 'starred' : ''
                            }`} />
                            {/* IsStarred */}


                    </div>

                </div>
            )

                : <p>No boards to show. lets create a new one! <button onClick={() => openGlobalModal(<AddBoardModal closeGlobalModal={closeGlobalModal} />)}>Create new board</button></p>}
        </section>
    )
}