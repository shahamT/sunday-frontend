// === Style

// === Libs

// === Services

// === Actions

// === Hooks / React
import { NavLink } from "react-router-dom";

// === Imgs

// === Child Components

// ====== Component ======
// =======================
export function AppSideNav({ }) {

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

                <NavLink to="#" className="clickable select clear size-32  icon-start i-Board full-width left-aligned" >example1
                    <div className="Menu-btn clickable clear size-24 i-Menu icon-btn"/>
                </NavLink>
                {/* {boards.map(board =>
                            <NavLink to="/app/board/${board._id}"`/app/board/${board._id}` className="clickable select clear size-32 i-Board full-width left-aligned icon-btn" >{board.name} </NavLink>
                    )} */}
            </section>


        </nav>

    )
}