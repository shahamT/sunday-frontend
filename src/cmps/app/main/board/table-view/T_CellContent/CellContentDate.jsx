// === Libs



// === Services

// === Actions
import { setColumnValue } from "../../../../../../store/actions/board.actions";

// === Hooks / React

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../../../reusables/PopUpMenu/PopUpMenu";
import { DatePickerColumn } from "../../value-setter/DatePicker";

// ====== Component ======
// =======================

export function CellContentDate({ taskId, column, columnValue }) {
    // === Consts

    // === Effects

    // === Functions
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();

        const isSameYear = date.getFullYear() === now.getFullYear();

        const options = {
            month: 'short',
            day: 'numeric',
            ...(isSameYear ? {} : { year: 'numeric' }),
        };

        return date.toLocaleDateString('en-US', options);
    }

    function onSetDate(date) {
        console.log("date: ", date)
        // if (date === '') {
        //     showErrorMsg(`Item name can't be empty`)
        //     set(columnValue?.value)
        //     return
        // }

        try {
            setColumnValue(taskId, column.id, date)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }


    return (
        <div className={`CellContentDate cell-contnet centered`}>
            <PopUpMenu
                position="bottom"
                renderContent={({ onCloseModal }) => (
                    <DatePickerColumn
                        onCloseModal={onCloseModal}
                        setDate={onSetDate}
                        defaultDate={columnValue?.value || null}
                    />
                )}
            >

                <div className="input-outline">

                </div>

                {columnValue
                    ?
                    <div className="date-label">{formatTimestamp(columnValue?.value)}
                    </div>

                    :
                    <div className="date-empty-state">
                        <div className="plus-btn">
                            <div className="plus-icon i-AddSmall" />
                        </div>
                        <div className="calendar-icon i-Calendar" />
                    </div>
                }
            </PopUpMenu>

        </div>
    )
}