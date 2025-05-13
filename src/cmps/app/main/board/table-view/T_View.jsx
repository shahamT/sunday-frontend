// === Libs


// === Services

// === Actions
import { loadBoard, loadBoards } from "../../../../../store/actions/board.actions.js";

// === Hooks / React
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// === Imgs

// === Child Components
import { T_Filter } from "./T_Filter";
import { T_Group } from "./T_Group";

// ====== Component ======
// =======================

export function T_View({ /* prop1, prop2 */ }) {
    // === Consts
    const board = useSelector(storeState => storeState.boardModule.board)
    const { boardId } = useParams()

    // === Effects
    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    // === Functions

    if (!board) return <div>Loading...</div>
    return (
        <section className="T_View">

            <T_Filter />

            <section className="groups-list">
                {board &&
                    board.groups.map(group => {
                        return <T_Group key={group.id} group={group} columns={board.columns} />
                    })
                }

                <div className="add-group-btn clickable clear outlined size-32 icon-start i-Add">Add group item</div>
            </section>



        </section>
    )
}