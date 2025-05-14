// === Style
import mainWSIcon from '../../assets/img/icons/mainWS.icon.png';
// === Libs
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

// Dnd kit
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
// === Services

// === Actions
import { loadBoards, updateBoard, updateBoards } from "../../store/actions/board.actions";

// === Hooks / React

// === Child Components
import { FavoritesBoards } from "./main/board/side-nave/FavoritesBoards";
import { closeGlobalModal, openGlobalModal } from "../../store/actions/app.actions";
import { AddBoardModal } from "./main/board/side-nave/AddBoardModal";
import { BoardNavBarLink } from './main/board/side-nave/BoardNavBarLink';

// ====== Component ======
// =======================
export function AppSideNav({ }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const { boardId } = useParams()

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
        const updatedBoard = { ...board, name: editedTitle }

        updateBoard(updatedBoard)
            .then(() => {
                setEditingBoardId(null);
            })
            .catch(() => console.error("Rename failed"));
    }


    function getPos(boardId) {
        if (!Array.isArray(boards)) return -1
        return boards.findIndex(board => board._id === boardId)
    }



    function handleDragEnd(event) {
        const { active, over } = event
        if (!over) return
        if (active.id === over.id) return

        const originalPos = getPos(active.id)
        const newPos = getPos(over.id)

        if (originalPos === -1 || newPos === -1) return
        const reorderedBoards = arrayMove(boards, originalPos, newPos)

        updateBoards(reorderedBoards)

    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 1,
            },
        }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    if (!boards) return <div>Loading...</div>

    return (
        <nav className="AppSideNav" >

            <section className="nav-section">
                <NavLink to="/app/home" className="clickable select full-width clear size-32 icon-start i-Home left-aligned" >Home </NavLink>
            </section>

            <div className="divider1" />

            <section className="nav-section">
                <a
                    className={`Favorite-btn clickable select clear size-32 icon-start i-Favorite full-width left-aligned ${isFavoritesOpen ? 'starred' : ''
                        }`}
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

                    <section className="workspaces-curr-board">
                        <div className="curr-wordspace-container">
                            {/* <div className="MoreBelowFilled-icon icon-start i-MoreBelowFilled " /> */}
                            <img src={mainWSIcon} alt="" />

                            <p>Main Workspaces</p>
                        </div>
                        <div className="add-btn clickable i-Add filled size-32" onClick={() => openGlobalModal(<AddBoardModal closeGlobalModal={closeGlobalModal} />)} />
                    </section>


                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={Array.isArray(boards) ? boards.map(b => b._id) : []} strategy={verticalListSortingStrategy}>
                            {boards.map(board =>
                                <BoardNavBarLink board={board}
                                    key={board._id}
                                    boardId={boardId}
                                    editedTitle={editedTitle}
                                    editingBoardId={editingBoardId}
                                    setEditedTitle={setEditedTitle}
                                    setEditingBoardId={setEditingBoardId}
                                    handleRename={handleRename} />

                            )}
                        </SortableContext>
                    </DndContext>


                    {/* {boards.map(board =>
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
                    )} */}


                </section>}


            {/* {openSideNaveModal && <SideNavModal board={board} setOpenSideNavModal={setOpenSideNavModal} />} */}
        </nav >

    )
}