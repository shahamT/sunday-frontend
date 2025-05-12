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
                loadBoards();
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
            <div className="divider1" />
            {isFavoritesOpen ?
                <FavoritesBoards boards={boards} /> :
                <section className="nav-section">
                    <div className="workspaces-bar">
                        <div className="workspase-icon i-Workspace" />
                        <p>Workspaces</p>
                        <div className="search-btn clickable clear icon-btn size-24 i-Search"/>





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
                                        valeu={board.name}
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
                        </div>
                    )}


                </section>}


            {/* {openSideNaveModal && <SideNavModal board={board} setOpenSideNavModal={setOpenSideNavModal} />} */}
        </nav>

    )
}