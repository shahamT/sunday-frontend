// === Libs

import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { EditStatusPicker } from "./EditStatusPicker"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function StatusPicker({ onCloseModal, setStatus, clearStatus, StatusArray,column }) {

    // === Consts

    // === Effects

    // === Functions

    return (
        <section className="status-picker-container">
            <section className='status-picker-items'>
                {StatusArray.map(status => (
                    <div
                        key={status.id}
                        className={`status-picker ${status.color}-bg`}
                        onClick={() => {
                            setStatus(status.id)
                            onCloseModal()
                        }}
                    >
                        {status.name}
                    </div>
                ))}
                <div className="default-status" onClick={() => {
                    clearStatus()
                    onCloseModal()
                }} />

            </section>
            <div className="divider" />


            <PopUpMenu
                position="start-end"
                renderContent={({ onCloseModal }) => (
                    <EditStatusPicker
                    columnId={column.id}
                     StatusArray={StatusArray}
                        onCloseModal={onCloseModal}
                    />
                )}
            >
                <div className="edit-btn clickable icon-start clear i-Edit size-32">Edit Labels</div>
            </PopUpMenu>



        </section>
    )
}