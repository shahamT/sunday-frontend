// === Style
import mainWSIcon from '../../assets/img/icons/mainWS.icon.png';
// === Libs
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

// Dnd kit
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
// === Services

// === Actions
import { loadBoard, loadBoards, updateBoard, updateBoards } from "../../store/actions/board.actions";

// === Hooks / React

// === Child Components
import { SideNavModal } from "./main/board/side-nave/SideNaveModal";
import { PopUpMenu } from "../reusables/PopUpMenu/PopUpMenu";
import { FavoritesBoards } from "./main/board/side-nave/FavoritesBoards";
import { GlobalModal } from "../reusables/GlobalModal/GlobalModal";
import { closeGlobalModal, openGlobalModal } from "../../store/actions/app.actions";
import { AddBoardModal } from "./main/board/side-nave/AddBoardModal";
import { store } from '../../store/store';
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
                tolerance: 30,
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

            {/* Home section */}
            <section className="main-section nav-section">
                <NavLink to="/app/home" className="clickable select full-width clear size-32 icon-start i-Home left-aligned" >Home </NavLink>
            </section>

            <div className="divider1" />

            {/* favorites section */}
            <section className="favorites-section nav-section">
                <a
                    className={`Favorite-btn clickable select clear size-32 icon-start i-Favorite full-width left-aligned ${isFavoritesOpen ? 'starred' : ''
                        }`}
                    onClick={() => setIsFavoritesOpen(prev => !prev)}
                >
                    Favorites
                    <div className="dropdown-icon-wraper">
                        {isFavoritesOpen ? (<span className="dropdown-icon i-DropdownChevronUp" />) : (<span className="dropdown-icon i-DropdownChevronDown" />)}
                    </div>
                </a>
            </section>

            {!isFavoritesOpen ? <div className="divider1" /> : null}

            {isFavoritesOpen ?
                <FavoritesBoards boards={boards} editingBoardId={editingBoardId} setEditedTitle={setEditedTitle} setEditingBoardId={setEditingBoardId} editedTitle={editedTitle} handleRename={handleRename} /> :


                <section className="workspaces-section nav-section">

                    <div className="workspaces-bar">
                        <div className="workspase-icon icon-start i-Workspace" />
                        <p>Workspaces</p>
                        <div className="search-btn clickable clear icon-btn size-24 i-Search" />
                    </div>

                    <section className="workspaces-container">
                        <div className="curr-wordspace-input">
                            <img src={mainWSIcon} alt="" />

                            <p>Main Workspaces</p>
                        </div>
                        <div className="add-btn clickable i-Add icon-btn filled size-32" onClick={() => openGlobalModal(<AddBoardModal closeGlobalModal={closeGlobalModal} />)} />
                    </section>

                    <div className="boards-list">
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
                    </div>





                </section>}

        </nav >

    )
}