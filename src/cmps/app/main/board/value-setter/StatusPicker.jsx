// === Libs

import { useState } from "react"
import { EditStatusPicker } from "./EditStatusPicker"
import { boardService } from "../../../../../services/board"



// ====== Component ======
// =======================

export function StatusPicker({ onCloseModal, setStatus, clearStatus, StatusArray, column }) {
    // === Consts
    const [isEditable, setIsEditable] = useState(false)

    const [labelToEdit, setLabelToEdit] = useState(boardService.getEmptyLabel())
    const [labelName, setLabelName] = useState(labelToEdit.name)
    const [isNewLabelOpen, setIsNewLabelOpen] = useState(false)
    // === Effects

    // === Functions
    function handleApply() {
        setIsEditable(false)
        StatusArray.forEach(status => {
            if (status.name.trim()) remove(column.id, status.id)
        })

    }


    return (
        <section className="status-picker-container">
            <section className='status-picker-items'>
                {!isEditable
                    ?
                    (
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

                        </>
                    )
                    :
                    (

                        <EditStatusPicker
                            columnId={column.id}
                            StatusArray={StatusArray}
                        />
                    )}

            </section>

            <section className="control-btns">
                 <div className="divider" />
                {isEditable
                    ?
                    (<>
                       
                        <button
                            className="apply-btn clickable clear size-32"
                            onClick={() => handleApply()}
                        >
                            Apply
                        </button>
                    </>
                    )
                    :
                    (
                    <>
                        <div
                            className="edit-btn clickable icon-start clear i-Edit size-32"
                            onClick={() => setIsEditable(true)}
                        >
                            Edit Labels
                        </div>
                    </>
                    )}


            </section>
        </section>
    )
}