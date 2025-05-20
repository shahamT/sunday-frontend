// === Libs

import { useState } from "react"
import { EditStatusPicker } from "./EditStatusPicker"
import { addLabel } from "../../../../../store/actions/board.actions"
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

                    </>
                ) : (

                    <EditStatusPicker
                        columnId={column.id}
                        StatusArray={StatusArray}
                        labelToEdit={labelToEdit}
                        setLabelToEdit={setLabelToEdit}
                        labelName={labelName}
                        setLabelName={setLabelName}
                    />
                )}

            </section>
            
            <section name="control-btns">
                {isEditable ? (<section className="control-btns-items">
                    <div className="divider" />
                    <button
                        className="apply-btn clickable clear size-32"
                        onClick={() => {
                            const newLabel = { ...labelToEdit, name: labelName.trim() }
                            setLabelToEdit(boardService.getEmptyLabel())
                            setLabelName(labelToEdit.name)
                            setIsNewLabelOpen(false)
                            setIsEditable(false)
                        }}
                    >
                        Apply
                    </button>
                </section>) :
                 (<section className="control-btns-items">
                    <div className="divider" />
                    <div
                        className="edit-btn clickable icon-start clear i-Edit size-32"
                        onClick={() => setIsEditable(true)}
                    >
                        Edit Labels
                    </div></section>)}


            </section>
        </section>
    )
}