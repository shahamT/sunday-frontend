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

export function T_GroupFooter({ itemColumnWidth}) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput('')

    // === Effects

    // === Functions


        function onAddTask() {
            if (value === '') {
                showErrorMsg(`Name can't be empty`)
                set(group.name)
                return
            }
            const updatedGroup = { ...group, name: value };
            updateGroup(updatedGroup)
                .catch(showErrorMsg(`Somthing went wrong`));
        }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="T_GroupFooter">
            <div className="menu-wraper" />
            <div className="t-left-indicator bottom disabled" />
            <div className="row-wraper t-row ">
                <label className="checkbox-container t-cell first footer disabled">
                    <input type="checkbox" className="disabled" />
                </label>

                <div
                className="text-container t-cell first footer"
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
                      <div className="empty-cell t-cell first footer"></div>
            </div>
        </section>
    )
}