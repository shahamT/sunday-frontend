// === Libs


// === Services

// === Actions
import { removeColumnValue, setColumnValue } from "../../../../../../store/actions/board.actions";

// === Hooks / React
import { useControlledInput } from "../../../../../../hooks/useControlledInput";
import { useRef, useState } from "react";
import { EditableText } from "../../../../../reusables/EditableText/EditableText";

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function CellContentNumber({ taskId, column, columnValue }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput(columnValue?.value)
    const [isEditing, setIsEditing] = useState(false)
    const inputRef = useRef()

    // === Effects

    // === Functions

    function onSetNumber() {
        setIsEditing(false)
        if (value === '') onClearNumber()
        try {
            setColumnValue(taskId, column.id, value)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    function onClearNumber() {
        set('')
        try {
            removeColumnValue(taskId, column.id)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }


    return (
        <div
            className="CellContentNumber cell-contnet"
            onClick={() => {
                setIsEditing(true)
                setTimeout(() => {
                    inputRef.current?.focus();
                }, 0);
            }}
        >

            <div className="text-container">
                <EditableText
                    ref={inputRef}
                    type="number"
                    size="small"
                    full={true}
                    value={value}
                    handleChange={handleChange}
                    onBlur={onSetNumber}
                    onPressEnter={onSetNumber}
                    centerText={true}
                />
            </div>

            {columnValue &&
                <div
                    className="clear-btn clickable clear icon-btn size-24 i-CloseSmall"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClearNumber();
                    }}
                />
            }


            {!columnValue && !isEditing &&
                <>
                    <div className="text-empty-state">
                        <div className="input-outline" />
                        <div className="plus-btn">
                            <div className="plus-icon i-AddSmall" />
                        </div>
                        <div className="text-icon i-Counter" />
                    </div>
                </>

            }

        </div>
    )
}