// === Libs

// === Services

// === Actions
import { removeColumnValue, setColumnValue } from "../../../../../../store/actions/board.actions";

// === Hooks / React
import { useRef, useState } from "react";

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../../../reusables/PopUpMenu/PopUpMenu";
import { StatusPicker } from "../../value-setter/StatusPicker";

// ====== Component ======
// =======================

export function CellContentStatus({ task, column, columnValue }) {
    // === Consts
    const [isFocused, setIsFocused] = useState(false)

      const taskId = task.id
    // === Effects

    // === Functions

    function setStatus(statusId) {
        try {
            setColumnValue(taskId, column.id, statusId, columnValue?.value)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    function onClearStatus() {
        try {
            removeColumnValue(taskId, column.id, columnValue?.value)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    const selectedLabel = column.type.labels.find(label => label.id === columnValue?.value);
    const labelName = selectedLabel?.name ?? '';
    const labelColor = selectedLabel?.color ?? '';

    return (
        <div className={`CellContentStatus cell-content`}>

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
                <div className={`cell-content centered ${labelColor}-bg-static ${columnValue ? '' : 'default-color'} ${isFocused ? 'cell-focused' : ''}`}>
                    <div className="fold" />
                    {columnValue && <p>{labelName}</p>}
                </div>
            </PopUpMenu>

        </div>



    )
}

