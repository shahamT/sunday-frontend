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
    const itemColumnWidth = itemColumn?.width ?? 0;
    const itemColumnId = itemColumn?.id ?? null;
    // === Effects

    // === Functions


    async function onAddTask() {

        if (value === '') {
            return
        }

        try {
            await addTask(group.id, itemColumnId, value)
            set('')
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }


    }

    return (
        <section className="T_GroupFooter">
            <div className="menu-wraper" />
            <div className={`t-left-indicator bottom disabled ${group.color}-bg`} />
            <div className="footer-row row-wraper t-row sticky ">
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