// === Libs


// === Services

// === Actions
import { addGroup } from "../../../../../store/actions/board.actions";

// === Hooks / React
import { useSelector } from "react-redux";


// === Imgs

// === Child Components
import { T_Filter } from "./T_Filter";
import { T_Group } from "./T_Group";

// ====== Component ======
// =======================

export function T_GroupsList({ /* prop1, prop2 */ }) {
    // === Consts
    const board = useSelector(storeState => storeState.boardModule.board)
    console.log("board: ", board)

    // === Functions
    function onAddGroup() {
        addGroup()
    }


    if (!board) return <div>Loading...</div>
    return (
        <section className="T_GroupsList">

            {board &&
                board.groups.map(group => {
                    return <T_Group key={group.id} group={group} columns={board.columns} />
                })
            }

            <div
                className="add-group-btn clickable clear outlined size-32 icon-start i-Add"
                onClick={onAddGroup}
            >Add group item</div>

        </section>
    )
}