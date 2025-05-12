// === Libs

// === Services

// === Actions
import { updateGroup } from "../../../../../store/actions/board.actions";

// === Hooks / React
import { useControlledInput } from "../../../../../hooks/useControlledInput";
import { showErrorMsg } from "../../../../../services/base/event-bus.service";

// === Imgs

// === Child Components
import { EditableText } from "../../../../reusables/EditableText/EditableText";
import { Tooltip } from "../../../../reusables/tooltip/Tooltip";

// ====== Component ======
// =======================

export function T_GroupHeader({ group }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput(group.name)

    // === Effects

    // === Functions
    function handleRename() {
        if (value === '') {
            showErrorMsg(`Name can't be empty`)
            set(group.name)
            return
        }
        const updatedGroup = { ...group, name: value };
        updateGroup(updatedGroup)
            .catch(showErrorMsg(`Somthing went wrong`));
    }



    return (
        <section className="T_GroupHeader">
            <div className="menu-wraper">
                <div className="group-menu-btn clickable clear icon-btn size-24 i-Menu"></div>
            </div>

            <div className="title-container">

                <div className="collapse-button-wraper">
                    <Tooltip title="Collapse group" position="top">
                        <div
                            className="collapse-button i-DropdownChevronDown"
                            style={{ color: "#9d50dd" }}
                        />
                    </Tooltip>
                </div>


                <div className="title-wraper">
                    <EditableText
                        value={value}
                        handleChange={handleChange}
                        size='g-title'
                        color="#9d50dd"
                        emojiPicker={false}
                        onBlur={handleRename}
                        onPressEnter={handleRename}
                    />
                </div>
                <p className="items-count">{group.tasks.length} Tasks</p>
            </div>
        </section>
    )
}