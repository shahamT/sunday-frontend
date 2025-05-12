// === Libs

// === Services

// === Actions

// === Hooks / React
import { useControlledInput } from "../../../../../hooks/useControlledInput"

// === Imgs

// === Child Components
import { EditableText } from "../../../../reusables/EditableText/EditableText"

// ====== Component ======
// =======================

export function T_GroupFooter({ itemColumnWidth }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput('')

    // === Effects

    // === Functions


    function onAddTask() {
        if (value === '') {
            return
        }
        console.log("added")
        addTask(value)
            .catch(showErrorMsg(`Somthing went wrong`));
    }

    return (
        <section className="T_GroupFooter">
            <div className="menu-wraper" />
            <div className="t-left-indicator bottom disabled" />
            <div className="row-wraper t-row sticky ">
                <label className="checkbox-container t-cell no-divider footer disabled">
                    <input type="checkbox" className="disabled" />
                </label>

                <div
                    className="text-container t-cell no-divider  footer"
                    style={{ width: itemColumnWidth - 33 + 'px' }}
                >
                    <EditableText
                        size="small"
                        placeholder="+ Add item"
                        full={true}
                        emojiPicker={false}
                        value={value}
                        handleChange={handleChange}
                        onBlur={onAddTask}
                        onPressEnter={onAddTask}
                        paddingStart={18}

                    />
                </div>
                <div className="empty-cell t-cell no-divider footer"></div>
            </div>
        </section>
    )
}