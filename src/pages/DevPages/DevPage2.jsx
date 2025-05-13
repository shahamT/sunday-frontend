

// === Libs

import { DatePickerColumn } from "../../cmps/app/main/board/value-setter/DatePicker";
import { PopUpMenu } from "../../cmps/reusables/PopUpMenu/PopUpMenu";

// === Services

// === Actions


// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function DevPage2({ /* prop1, prop2 */ }) {



return(
        <section className='date-picker'>
            <h1>dev3</h1>
            <PopUpMenu
                position="start-end"
                renderContent={({ onCloseModal }) => (
                    <DatePickerColumn
                    onCloseModal={onCloseModal}
                    />
                )}
            >
                <div className="___-btn i-Night clickable filled negative size-40" />
            </PopUpMenu></section>
    )
}