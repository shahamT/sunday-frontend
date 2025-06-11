// === Libs

// === Services

// === Actions
import { setColumnValue } from "../../../../../store/actions/board.actions"

// === Hooks / React
import { useState } from "react"

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { StatusPicker } from "../value-setter/StatusPicker"

// ====== Component ======
// =======================

export function K_ContentStatus({ column, value, taskId }) {

    // === Consts
    const label = column.type.labels.find(label => label.id === value)
    const [isFocused, setIsFocused] = useState(false)

    // === Effects

    // === Functions
    function setStatus(statusId) {
        try {
            setColumnValue(taskId, column.id, statusId, value)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    function onClearStatus() {
        try {
            removeColumnValue(taskId, column.id, value)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    return (
        <section className="K_ContentStatus">
            
            <PopUpMenu
                stretchTrigger={true}
                gap={4}
                noArrow={false}
                position="bottom"
                onOpen={() => setIsFocused(true)}
                onClose={() => setIsFocused(false)}
                renderContent={({ onCloseModal }) => (
                    <StatusPicker
                        column={column}
                        onCloseModal={onCloseModal}
                        setStatus={setStatus}
                        clearStatus={onClearStatus}
                        StatusArray={column?.type?.labels || []}
                    />
                )}
            >
                <div className={`status clickable size-24 ${label?.color}-bg`} >{label?.name}</div>
            </PopUpMenu>

        </section>
    )
}