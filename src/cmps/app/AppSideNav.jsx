// === Style

// === Libs

// === Services

// === Actions

// === Hooks / React
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadBoards } from "../../store/actions/board.actions";

// === Imgs
// === Child Components

// ====== Component ======
// =======================
export function AppSideNav({ }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    useEffect(()=>{
        loadBoards()
    },[])
    
    return (
        <nav className="AppSideNav" >

            <section className="nav-section">
                <NavLink to="/app/home" className="clickable select full-width clear size-32 icon-start i-Home left-aligned" >Home </NavLink>
            </section>

            {/* <hr /> */}

            <section className="nav-section">
                <a className="Favorite-btn clickable select clear size-32 icon-start i-Favorite full-width left-aligned">
                    Favorites
                    <span className="i-DropdownChevronDown"></span>
                </a>
            </section>

            <hr />
            <section className="nav-section">
                <div className="workspaces-bar">
                    <div className="workspase-icon i-Workspace"/>
                    <p>Workspaces</p>
                        <div className="search-btn clickable clear icon-btn size-24 i-Search"></div>
                </div>
                {boards.map(board =>

                            <NavLink key={board._id} to={`/app/board/${board._id}`} className="clickable select clear size-32 i-Board icon-start full-width left-aligned" >{board.name} </NavLink>
                    )}
            </section>


        </nav>

    )
}