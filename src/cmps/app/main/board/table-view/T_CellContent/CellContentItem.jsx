// === Libs

// === Services

// === Actions

// === Hooks / React
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// === Imgs

// === Child Components
import { EditableText } from "../../../../../reusables/EditableText/EditableText";
import { useControlledInput } from "../../../../../../hooks/useControlledInput";
import { setColumnValue } from "../../../../../../store/actions/board.actions";

// ====== Component ======
// =======================

export function CellContentItem({ column, columnValue, taskId }) {
    // === Consts


    const [value, handleChange, reset, set] = useControlledInput(columnValue?.value)

    const navigate = useNavigate();
    const board = useSelector(storeState => storeState.boardModule.board)

    // === Effects

    
    // === Functions
    function onOpenTaskDetails(ev) {
        ev.stopPropagation()
        navigate(`/app/board/${board._id}/task/${taskId}`)
    }

    function onSetName() {
        if (value === '') {
            showErrorMsg(`Item name can't be empty`)
            set(columnValue?.value)
            return
        }

        try {
            setColumnValue(taskId, column.id, value)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    return (
        <div
            className="CellContentItem cell-contnet"
            onClick={onOpenTaskDetails}
        >
            <div className="offset-hiding-layer" /> {/* hiding the scrolled row content on the left */}

            <label htmlFor={`t${taskId}`} className="checkbox-container">
                <input type="checkbox" name="" id={`t${taskId}`} />
            </label>

            <div className="text-container">
                <EditableText
                    size="small"
                    full={true}
                    value={value}
                    handleChange={handleChange}
                    onBlur={onSetName}
                    onPressEnter={onSetName}
                />
            </div>
        </div>
    )
}