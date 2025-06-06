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
import { useEffect, useRef, useState } from "react";

// ====== Component ======
// =======================

export function T_GroupHeader({ group }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput(group.name)
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    //  === task menu position on mount and while scrolling ===
    const indicatorRef = useRef();
    const [menuPos, setMenuPos] = useState(null);

    useEffect(() => {
        function updatePos() {
            if (!indicatorRef.current) return;
            const rect = indicatorRef.current.getBoundingClientRect();
            setMenuPos({
                top: rect.top,
                left: rect.left - 40,
            });
        }

        updatePos();

        window.addEventListener('scroll', updatePos, true);
        window.addEventListener('resize', updatePos);
        return () => {
            window.removeEventListener('scroll', updatePos, true);
            window.removeEventListener('resize', updatePos);
        };
    }, []);


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
        <section className={`T_GroupHeader ${isMenuOpen ? 'menu-in-focus' : ''}`}>

            <div className="indicator-placeholder" ref={indicatorRef}>
                <div className="menu-container"
                    style={{
                        position: 'fixed',
                        top: menuPos?.top ?? 0,
                        left: menuPos?.left ?? 0,
                    }}
                >
                    <div className={`menu-wraper`}>
                        <PopUpMenu
                            position="bottom-start"
                            onOpen={() => setIsMenuOpen(true)}
                            onClose={() => setIsMenuOpen(false)}
                            renderContent={({ onCloseModal }) => (
                                <GroupMenu
                                    onCloseModal={onCloseModal}
                                    group={group}
                                />
                            )}
                        >
                            <div className={`group-menu-btn clickable clear icon-btn size-24 i-Menu ${isMenuOpen ? 'in-focus' : ''}`}></div>
                        </PopUpMenu>
                    </div>
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