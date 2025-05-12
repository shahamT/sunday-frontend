// === Libs

// === Services

// === Actions

// === Hooks / React
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// === Imgs

// === Child Components
import { EditableText } from "../../../../../reusables/EditableText/EditableText";

// ====== Component ======
// =======================

export function CellContentItem({ column, columnValue, taskId }) {
    // === Consts
    const navigate = useNavigate();
    const board = useSelector(storeState => storeState.boardModule.board)
    // === Effects

    // === Functions
    function onOpenTaskDetails(ev) {
        ev.stopPropagation();
        navigate(`/app/board/${board._id}/task/${taskId}`)
    }

    return (
        <div
            className="CellContentItem cell-contnet"
            onClick={onOpenTaskDetails}
        >
            <label htmlFor={`t${taskId}`} className="checkbox-container">
                <input type="checkbox" name="" id={`t${taskId}`} />
            </label>

            <div className="text-container">
                <EditableText value={columnValue.value} size="small" full={true} emojiPicker={false}/>
            </div>
        </div>
    )
}