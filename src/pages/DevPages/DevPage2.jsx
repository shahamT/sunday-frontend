

// === Libs

import { useState } from "react";
import { DatePickerColumn } from "../../cmps/app/main/board/value-setter/DatePicker";
import { PopUpMenu } from "../../cmps/reusables/PopUpMenu/PopUpMenu";
import { StatusPicker } from "../../cmps/app/main/board/value-setter/StatusPicker";

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function DevPage2({ /* prop1, prop2 */ }) {
    const columns = [
        {
            id: "dfgds132",
            name: "To Do",
            pos: 1,
            color: "lavender"
        },
        {
            id: "dfgd432",
            name: "In Progress",
            pos: 2,
            color: "working_orange"
        },
        {
            id: "dfgds532",
            name: "Done",
            pos: 3,
            color: "done-green"
        }
    ]

    const [status, setStatus] = useState(null)


    return (
        <section className='status-picker-container'>
            {/* <h1>dev3</h1>
            {columns.map(status => (
                <div
                    key={status.id}
                    className={`status-picker ${status.color}-bg`}
                    onClick={() => setStatus(status)}
                >
                    {status.name}
                </div>
            ))}
            <div className="default-status" onClick={onCloseModal}></div> */}

            <PopUpMenu
                noArrow={false}
                position="start-end"
                renderContent={({ onCloseModal }) => (
                    <StatusPicker
                        onCloseModal={onCloseModal}
                        setStatus={setStatus}
                        defaultStatus={columns}
                    />
                )}
            >
                <div className={status === null ? "default-status" : `status-picker ${status.color}-bg`}>
                    {status?.name || ''}
                </div>

            </PopUpMenu>
        </section>
    )
}