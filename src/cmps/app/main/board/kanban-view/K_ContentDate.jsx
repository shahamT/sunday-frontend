// === Libs

// === Services
import { showErrorMsg } from "../../../../../services/base/event-bus.service";

// === Actions
import { setColumnValue } from "../../../../../store/actions/board.actions";

// === Hooks / React

// === Imgs

// === Child Components
import { DatePickerColumn } from "../value-setter/DatePicker";
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu";

// ====== Component ======
// =======================
export function K_ContentDate({ column, value, taskId }) {
    // === Consts
    const formattedValue = formatTimestamp(value)

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
        try {
            setColumnValue(taskId, column.id, date, value)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    return (
        <section className="K_ContentDate">

            <PopUpMenu
                position="bottom"
                gap={1}
                stretchTrigger={true}
                renderContent={({ onCloseModal }) => (
                    <DatePickerColumn
                        onCloseModal={onCloseModal}
                        setDate={onSetDate}
                        defaultDate={value || null}
                    />
                )}
            >
                <button className="content date clickable clear size-24 icon-start i-Calendar">{formattedValue}</button>
            </PopUpMenu>

        </section>
    )
}