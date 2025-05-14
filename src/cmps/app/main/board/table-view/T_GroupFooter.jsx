// === Libs

// === Services

// === Actions
import { addTask } from "../../../../../store/actions/board.actions"

// === Hooks / React
import { useControlledInput } from "../../../../../hooks/useControlledInput"

// === Imgs

// === Child Components
import { EditableText } from "../../../../reusables/EditableText/EditableText"

// ====== Component ======
// =======================

export function T_GroupFooter({ group, itemColumn }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput('')
    const itemColWidth = itemColumn?.width ?? 0;
    const itemColId = itemColumn?.id ?? null;
    // === Effects

    // === Functions


    async function onAddTask() {
        if (value === '') {
            return
        }

        const valueToSave = value
        set('')
        try {
            addTask({ groupId: group.id, itemColId, valueToSave })
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
            set(valueToSave)
        }


    }

    return (
        <section className="T_GroupFooter">
            <div className={`t-left-indicator bottom disabled ${group.color}-bg`} />
            <div className="footer-row row-wraper t-row sticky ">
                <label className="checkbox-container t-cell no-divider footer disabled">
                    <input type="checkbox" className="disabled" />
                </label>

                <div
                    className="text-container t-cell no-divider  footer"
                    style={{ width: itemColWidth - 33 + 'px' }}
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