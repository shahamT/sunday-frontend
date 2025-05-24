// === Libs

// === Services
import { showErrorMsg } from "../../../../../services/base/event-bus.service"

// === Actions
import { removeColumnValue, setColumnValue } from "../../../../../store/actions/board.actions"

// === Hooks / React
import { useControlledInput } from "../../../../../hooks/useControlledInput"

// === Imgs

// === Child Components
import { EditableText } from "../../../../reusables/EditableText/EditableText"

// ====== Component ======
// =======================

export function K_ContentText({ column, value, taskId }) {
    // === Consts
    const [newValue, handleChange, reset, set] = useControlledInput(value)

    // === Effects

    // === Functions
    function onSetText() {
        if (!newValue.length) {
            try {
                removeColumnValue(taskId, column.id, value)
            }
            catch (err) {
                showErrorMsg(`Somthing went wrong`)
            }  
        }

        try {
            setColumnValue(taskId, column.id, newValue, value)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_ContentText">

            <div className="content text clickable clear size-24 select">
                <EditableText
                    value={newValue}
                    full={false}
                    size="small"
                    handleChange={handleChange}
                    onBlur={onSetText}
                    onPressEnter={onSetText}
                />
                <span>(Text)</span>    
            </div>
        </section>
    )
}