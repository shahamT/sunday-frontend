// === Style

// === Libs
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// === Services

// === Actions
import { loadBoard, loadBoards, updateBoard } from "../../store/actions/board.actions";

// === Hooks / React

// === Child Components
import { SideNavModal } from "./main/board/side-nave/SideNaveModal";
import { PopUpMenu } from "../reusables/PopUpMenu/PopUpMenu";
import { FavoritesBoards } from "./main/board/side-nave/FavoritesBoards";
import { GlobalModal } from "../reusables/GlobalModal/GlobalModal";
import { closeGlobalModal, openGlobalModal } from "../../store/actions/app.actions";
import { AddBoardModal } from "./main/board/side-nave/AddBoardModal";

// ====== Component ======
// =======================
export function AppSideNav({ }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const board = useSelector(storeState => storeState.boardModule.board)

    const [editingBoardId, setEditingBoardId] = useState(null)
    const [editedTitle, setEditedTitle] = useState('')
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

    useEffect(() => {
        loadBoards()
    }, [])

    function handleRename(board) {
        if (!editedTitle || editedTitle === board.name) {
            setEditingBoardId(null);
            return
        }
        const updatedBoard = { ...board, name: editedTitle };

        updateBoard(updatedBoard)
            .then(() => {
                setEditingBoardId(null);
            })
            .catch((err) => console.error("Rename failed", err));
    }


    return (
        <nav className="AppSideNav" >

            <section className="nav-section">
                <NavLink to="/app/home" className="clickable select full-width clear size-32 icon-start i-Home left-aligned" >Home </NavLink>
            </section>

            <div className="divider1" />

            <section className="nav-section">
                <a
                    className={`Favorite-btn clickable select clear size-32 icon-start i-Favorite full-width left-aligned ${isFavoritesOpen ? 'starred' : ''}`}
                    onClick={() => setIsFavoritesOpen(prev => !prev)}
                >
                    Favorites
                    {isFavoritesOpen ? (<span className="i-DropdownChevronUp" />) : (<span className="i-DropdownChevronDown" />)}
                </a>
            </section>
            {!isFavoritesOpen ? <div className="divider1" /> : null}

            {isFavoritesOpen ?
                <FavoritesBoards boards={boards} editingBoardId={editingBoardId} setEditedTitle={setEditedTitle} setEditingBoardId={setEditingBoardId} editedTitle={editedTitle} handleRename={handleRename} /> :
                <section className="nav-section">
                    <div className="workspaces-bar">
                        <div className="workspase-icon icon-start i-Workspace" />
                        <p>Workspaces</p>
                        <div className="search-btn clickable clear icon-btn size-24 i-Search" />
                    </div>

                    <div className="workspaces-curr-board">
                        <div className="curr-wordspace-container">
                            <div className="MoreBelowFilled-icon icon-start i-MoreBelowFilled " />
                            <p>Main Workspaces</p>
                        </div>
                        <div className="add-btn clickable i-Add filled size-32" onClick={() => openGlobalModal(<AddBoardModal closeGlobalModal={closeGlobalModal} />)} />
                    </div>
                    {boards.map(board =>
                        <div key={board._id} className="board-item-nav">
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
                    )}


                </section>}


            {/* {openSideNaveModal && <SideNavModal board={board} setOpenSideNavModal={setOpenSideNavModal} />} */}
        </nav>

    )
}