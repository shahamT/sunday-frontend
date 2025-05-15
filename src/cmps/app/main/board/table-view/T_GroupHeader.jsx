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
import { useSelector } from "react-redux";
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu";
import { GroupMenu } from "../popupMenu/GroupMenu";

// ====== Component ======
// =======================

export function T_GroupHeader({ group }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput(group.name)
    const board = useSelector(storeState => storeState.boardModule.board)
    // === Effects

    // === Functions
    function handleRename() {
        if (value === '') {
            showErrorMsg(`Name can't be empty`)
            set(group.name)
            return
        }
        const updatedGroup = { ...group, name: value }
        try {
            updateGroup(updatedGroup)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }


    function setColor(color) {
        const updatedGroup = { ...group, color: color }
        try {
            updateGroup(updatedGroup)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    return (
        <section className="T_GroupHeader">
            <div className="menu-container">
                <div className="menu-wraper">
                    <PopUpMenu
                        position="bottom-start"
                        renderContent={({ onCloseModal }) => (
                            <GroupMenu
                                onCloseModal={onCloseModal}
                                group={group}
                            />
                        )}
                    >
                        <div className="group-menu-btn clickable clear icon-btn size-24 i-Menu"></div>
                    </PopUpMenu>
                </div>
            </div>

            <div className="title-container">


                <div className="title-container">

                    <div className="collapse-button-wraper">
                        <Tooltip title="Collapse group" position="top">
                            <div
                                className={`collapse-button i-DropdownChevronDown ${group.color}-text`}
                            />
                        </Tooltip>
                    </div>

                    <div className="title-wraper">
                        <EditableText
                            value={value}
                            handleChange={handleChange}
                            size='g-title'
                            emojiPicker={false}
                            onBlur={handleRename}
                            onPressEnter={handleRename}
                            additionalClass={`${group.color}-text`}
                            colorPicker={{
                                selectedColor: group.color,
                                setColor: setColor,
                                variant: 'limited',
                            }}

                        />
                    </div>
                    <p className="items-count">{group.tasks.length} Tasks</p>
                </div>

            </div>
        </section>
    )
}