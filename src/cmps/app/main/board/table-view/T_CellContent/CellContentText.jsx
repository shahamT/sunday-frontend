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

export function CellContentText({ task, column, columnValue }) {
    // === Consts
      const taskId = task.id
    const [value, handleChange, reset, set] = useControlledInput(columnValue?.value)
    const [isEditing, setIsEditing] = useState(false)
    const inputRef = useRef()

    // === Effects

    // === Functions

    function onSetText() {
        setIsEditing(false)
        if (value.trim() === '') onClearText()
        try {
            setColumnValue(taskId, column.id, value)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    function onClearText() {
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
            className="CellContentText cell-content"
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
                    size="small"
                    full={true}
                    value={value}
                    emojiPicker={true}
                    handleChange={handleChange}
                    onBlur={onSetText}
                    onPressEnter={onSetText}
                    centerText={true}
                />
            </div>

            {columnValue &&
                <div
                    className="clear-btn clickable clear icon-btn size-24 i-CloseSmall"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClearText();
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
                        <div className="text-icon i-TextCopy" />
                    </div>
                </>

            }

        </div>
    )
}