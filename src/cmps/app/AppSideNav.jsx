// === Style
import mainWSIcon from '../../assets/img/icons/mainWS.icon.png';
// === Libs
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

// Dnd kit
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { closestCenter, DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { DragOverlay } from '@dnd-kit/core'

// === Services

// === Actions
import { getCmdUpdateMiniBoardsFromSocket, loadBoards, updateBoard, updateBoards } from "../../store/actions/board.actions";

// === Hooks / React

// === Child Components
import { FavoritesBoards } from "./main/board/side-nave/FavoritesBoards";
import { closeGlobalModal, openGlobalModal } from "../../store/actions/app.actions";
import { AddBoardModal } from "./main/board/side-nave/AddBoardModal";
import { BoardNavBarLink } from './main/board/side-nave/BoardNavBarLink';
import { SearchSideNav } from './main/board/side-nave/SearchSideNav';
import { Loader } from '../reusables/Loader/Loader';
import { SOCKET_EVENT_MINI_BOARDS_UPDATE } from '../../services/base/socket.service';

// ====== Component ======
// =======================
export function AppSideNav({ }) {
    const { boards, boardsFilterBy } = useSelector(storeState => storeState.boardModule)
    const filteredBoards = Array.isArray(boards) ? boards.filter(board =>
        (board?.name || '').toLowerCase().includes((boardsFilterBy?.txt || '').toLowerCase())
    ) : []

    const { boardId } = useParams()
    const dispatch = useDispatch()

    const [editingBoardId, setEditingBoardId] = useState(null)
    const [editedTitle, setEditedTitle] = useState('')
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
    const [activeBoard, setActiveBoard] = useState(null)
    const [isSearchOpen, setSearchOpen] = useState(false)
    const [boardFilterBy, setBoardFilterBy] = useState('')


    useEffect(() => {
        loadBoards()

        const onBoardsUpdate = (boards) => {
            dispatch(getCmdUpdateMiniBoardsFromSocket(boards))
        }

        socketService.on(SOCKET_EVENT_MINI_BOARDS_UPDATE, onBoardsUpdate)

        return () => {
            socketService.off(SOCKET_EVENT_MINI_BOARDS_UPDATE, onBoardsUpdate)
        }
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


    function handleDragStart(event) {
        const { active } = event
        const dragged = boards.find(b => b._id === active.id)
        setActiveBoard(dragged)
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
        // useSensor(PointerSensor),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )


    return (
        <nav className="AppSideNav" >

            {/* Home section */}
            <section className="main-section nav-section">
                <NavLink to="/app/home" className="clickable select full-width clear size-32 icon-start i-Home left-aligned" >Home </NavLink>
            </section>

            <div className="divider" />

            {/* favorites section */}
            <section className="favorites-section nav-section">
                <a
                    className={`favorite-btn clickable select clear size-32 icon-start i-Favorite full-width left-aligned ${isFavoritesOpen ? 'starred' : ''
                        }`}
                    onClick={() => setIsFavoritesOpen(prev => !prev)}
                >
                    Favorites
                    <div className="dropdown-icon-wraper">
                        {isFavoritesOpen ? (<span className="dropdown-icon i-DropdownChevronUp" />) : (<span className="dropdown-icon i-DropdownChevronDown" />)}
                    </div>
                </a>
            </section>

            {!isFavoritesOpen ? <div className="divider" /> : null}

            {isFavoritesOpen ?
                <FavoritesBoards boards={boards} editingBoardId={editingBoardId} setEditedTitle={setEditedTitle} setEditingBoardId={setEditingBoardId} editedTitle={editedTitle} handleRename={handleRename} /> :


                <section className="workspaces-section nav-section">

                    <div className="workspaces-bar">
                        {!isSearchOpen ? (
                            <>
                                <div className="workspase-icon icon-start i-Workspace" />
                                <p>Workspaces</p>
                                <div
                                    className="search-btn clickable clear icon-btn size-24 i-Search"
                                    onClick={() => setSearchOpen(prev => !prev)}
                                />
                            </>
                        ) :
                            <SearchSideNav setSearchOpen={setSearchOpen} boardFilterBy={boardFilterBy} setBoardFilterBy={setBoardFilterBy} />
                        }
                    </div>
                    <section className="workspaces-container">
                        <div className="curr-wordspace-input">
                            <img src={mainWSIcon} alt="" />

                            <p>Main Workspaces</p>
                        </div>
            {/* create new board */}
                        <div className="add-btn clickable i-Add icon-btn filled size-32" onClick={() => openGlobalModal(<AddBoardModal closeGlobalModal={closeGlobalModal} />)} />
                    </section>


                    {!boards &&
                        (<div className="global-loader-container" >
                            <Loader
                                size={4}
                                width={6}
                                color="#0073ea"
                                textSize={1.2}
                            />
                        </div>)
                    }

                    {/* {boards.length === 0 &&
                        (<div className="global-loader-container" >
                            <Loader
                                size={4}
                                width={6}
                                color="#0073ea"
                                textSize={1.2}
                            />
                        </div>)
                    } */}

                    {boards.length !== 0 && filteredBoards.length === 0 ?
                        <div className="board-list-empty-state-wraper">
                            <img className="empty-state-img" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747752854/boards-empty-state.png" />
                            <p className="empty-state-title" >No boards to show.</p>
                        </div>

                        :
                        <div className="board-list">
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                                onDragStart={handleDragStart}
                            >
                                <SortableContext items={Array.isArray(filteredBoards) ? filteredBoards.map(b => b._id) : []} strategy={verticalListSortingStrategy}>
                                    {filteredBoards.map(board =>
                                        <BoardNavBarLink board={board}
                                            key={board._id}
                                            editedTitle={editedTitle}
                                            editingBoardId={editingBoardId}
                                            setEditedTitle={setEditedTitle}
                                            setEditingBoardId={setEditingBoardId}
                                            handleRename={handleRename} />

                                    )}
                                </SortableContext>
                                <DragOverlay>
                                    {activeBoard ? (
                                        <div className="drag-overlay-board">
                                            <div className="board-btn clickable size-32 icon-start left-aligned i-Board" >
                                                <p>{activeBoard.name}</p>
                                            </div>
                                        </div>
                                    ) : null}

                                </DragOverlay>

                            </DndContext>
                        </div>


                    }




                </section>}

        </nav >

    )
}