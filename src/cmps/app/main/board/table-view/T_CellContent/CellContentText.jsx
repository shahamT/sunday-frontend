// === Libs


// === Services

// === Actions
import { removeColumnValue, setColumnValue } from "../../../../../../store/actions/board.actions";

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function CellContentText({ taskId, column, columnValue }) {
    // === Consts

    // === Effects

    // === Functions

    function onSetDate(date) {
        try {
            setColumnValue(taskId, column.id, date)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    function onClearDate() {
        try {
            removeColumnValue(taskId, column.id)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }


    return (
        <div className={`CellContentText cell-contnet`}>

            <div className="input-outline" />

            {columnValue &&
                <div
                    className="clear-btn clickable clear icon-btn size-24 i-CloseSmall"
                    onClick={onClearDate}
                />}
            {columnValue
                ?
                <>
                    <div className="text-label">
                       

                    </div>
                </>
                :
                <div className="text-empty-state">
                    <div className="plus-btn">
                        <div className="plus-icon i-AddSmall" />
                    </div>
                    <div className="text-icon i-TextCopy" />
                </div>
            }


        </div>
    )
}