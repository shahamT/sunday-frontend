// === Libs


// === Services

// === Actions
import { loadBoard, loadBoards } from "../../../../../store/actions/board.actions";

// === Hooks / React
import { useSelector } from "react-redux";

// === Imgs

// === Child Components
import { T_Filter } from "./T_Filter";
import { T_GroupsList } from "./T_GroupsList";
import { useEffect } from "react";

// ====== Component ======
// =======================

export function T_View({ /* prop1, prop2 */ }) {
    // === Consts
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const board = useSelector(storeState => storeState.boardModule.board)
    console.log("boards: ", boards)
    console.log("board: ", board)

    // === Effects
    useEffect(() => {
        loadBoards()
        // loadBoard('O1LeS')
    }, [])
    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="T_View">
            <T_Filter />
            <T_GroupsList />
        </section>
    )
}