// === Libs

import { useState } from "react"
import { EditStatusPicker } from "./EditStatusPicker"



// ====== Component ======
// =======================

export function StatusPicker({ onCloseModal, setStatus, clearStatus, StatusArray,column }) {

    // === Consts
const [isEditable, setIsEditable]= useState(false)
// const [isEditable, setIsEditable]= useState(false)

    // === Effects

    // === Functions

    return (
        <section className="status-picker-container">
            <section className='status-picker-items'>
                {!isEditable ? (
                    <>
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
                        <div
                            className="default-status"
                            onClick={() => {
                                clearStatus()
                                onCloseModal()
                            }}
                        />
                            <div className="divider" />
                        <div
                            className="edit-btn clickable icon-start clear i-Edit size-32"
                            onClick={() => setIsEditable(true)}
                        >
                            Edit Labels
                        </div>
                    </>
                ) : (
                    
                    <EditStatusPicker
                        columnId={column.id}
                        StatusArray={StatusArray}
                    />
                )}
            </section>
        </section>
    )
    }