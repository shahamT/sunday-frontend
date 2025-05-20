// === Libs

import { useSelector } from "react-redux"
import { AddBoardModal } from "../side-nave/AddBoardModal"
import { useNavigate } from "react-router-dom"
import { IsStarred } from "../value-setter/IsStarred"
import { useEffect, useState } from "react"
import { updateUser } from "../../../../../store/actions/user.actions"
import { openGlobalModal } from "../../../../../store/actions/app.actions"

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
    const lastViewedBoards = useSelector(storeState => storeState.userModule.loggedinUser?.lastViewedBoards)
    const [isRecentlyVisitedOpen, setIsRecentlyVisitedOpen] = useState(true)

    const workManagement = 'work management > Main workspace'
    const navigate = useNavigate()

    // === Effects

    // === Functions
    function onChoooseBoard(boardId) {
        navigate(`/app/board/${boardId}`)
        updateUser(boardId)
    }

    if (!lastViewedBoards) return <></>

    return (
        <section className="board-list">
            <div className="recently-visited-wraper" onClick={() => setIsRecentlyVisitedOpen(prev => !prev)}>
                {isRecentlyVisitedOpen ? (<span className="dropdown-icon left-aligned i-DropdownChevronDown " />) : (<span className="dropdown-icon left-aligned i-DropdownChevronUp" />)}
                Recently visited
            </div>
            {isRecentlyVisitedOpen &&
                <section className="board-preview-container">
                    {!!boards.length && !!lastViewedBoards.length
                        ? (lastViewedBoards.map(viewedBoard => {
                            const board = boards.find(board => board._id === viewedBoard.boardId)
                            if (!board) return null
                            return (
                                <article key={board._id} className="board-preview" onClick={() => onChoooseBoard(board._id)}>
                                    <div className="img-wrapper">
                                        <img src="https://res.cloudinary.com/ditvgrfxq/image/upload/v1747320341/kkvc6y2yzsy9taa4d7y2.png" alt="Monday board" />
                                    </div>
                                    <div className="board-txt-container clickable select size-32 icon-start full-width left-aligned i-Board">
                                        <label className="board-txt ">
                                            {board.name}

                                        </label>
                                        <div
                                            className={`favorite-btn clickable select size-32 ${board.isStarred ? 'starred' : ''}`}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <IsStarred board={board} />
                                        </div>

                                    </div>
                                    <div className="board-work-management">
                                        <img className="monday-icon" src="https://res.cloudinary.com/ditvgrfxq/image/upload/v1747472186/pdaj4ymmpllwsrftlivp.png" alt="" />
                                        <p>{workManagement}</p>
                                    </div>
                                </article>)
                        }))

                        :
                        <div className="board-list-empty-state-wraper">
                            <img className="empty-state-img" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747752854/boards-empty-state.png" />
                            <p  className="empty-state-title" >No boards to show.</p>
                            <p  className="empty-state-subtitle">Lets create a new one!</p>
                            
                            <div
                                className="add-board-btn clickable filled icon-start i-Add size-40"
                                onClick={() => openGlobalModal(<AddBoardModal/>)}>
                                Add new board
                            </div>
                        </div>
                    }
                </section >
            }
        </section >
    )
}