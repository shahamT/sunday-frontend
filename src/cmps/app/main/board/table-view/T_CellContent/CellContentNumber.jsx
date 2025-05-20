// === Libs


// === Services

// === Actions
import { removeColumnValue, setColumnValue } from "../../../../../../store/actions/board.actions";

// === Hooks / React
import { useControlledInput } from "../../../../../../hooks/useControlledInput";
import { useEffect, useRef, useState } from "react";
import { EditableText } from "../../../../../reusables/EditableText/EditableText";

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function CellContentNumber({ task, column, columnValue }) {
    // === Consts
    const taskId = task.id
    const [value, handleChange, reset, set] = useControlledInput(columnValue?.value)
    const [isEditing, setIsEditing] = useState(false)
    const inputRef = useRef()

    // === Effects
    useEffect(() => {
        // update input value dynamically if it's changed in the database
        set(columnValue?.value)
    }, [columnValue?.value])
    // === Functions

    function onSetNumber() {
        setIsEditing(false)

        if (value === '') onClearNumber()
        else {
            try {
                setColumnValue(taskId, column.id, value, columnValue?.value)
            }
            catch (err) {
                showErrorMsg(`Somthing went wrong`)
            }
        }
    }

    function onClearNumber() {
        set('')
        try {
            removeColumnValue(taskId, column.id, columnValue?.value)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }


    return (
        <div
            className="CellContentNumber cell-content"
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