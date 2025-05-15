// === Libs

// === Services

// === Actions
import { updateColumn } from "../../../../../store/actions/board.actions";

// === Hooks / React
import { useControlledInput } from "../../../../../hooks/useControlledInput";

// === Imgs

// === Child Components
import { EditableText } from "../../../../reusables/EditableText/EditableText";
import { Tooltip } from "../../../../reusables/tooltip/Tooltip";
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu";
import { useEffect } from "react";
import { ColumnMenu } from "../popupMenu/ColumnMenu";

// ====== Component ======
// =======================

export function T_ColumnHeaderCell({ column, groupId }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput(column.name)

    // === Effects
    useEffect(() => {
        set(column.name)
    }, [column.name])

    // === Functions
    function onUpdateColumnName() {
        if (value === '') {
            showErrorMsg(`Column name can't be empty`)
            set(column.name)
            return
        }
        const updatedColumn = { ...column, name: value };

        try {
            updateColumn(updatedColumn)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }

    }


    const variant = column.type.variant
    return (
        <div
            className={`T_ColumnHeaderCell ${variant === 'item' ? 'item-column' : ''}`}
            style={{ width: column.width + 'px' }}
        >


            <div className="cell-contnet">
                {variant === 'item'
                    ?
                    <>
                       
                        <label htmlFor={`g${groupId}`} className="checkbox-container">
                            <input type="checkbox" name="" id={`g${groupId}`} />
                        </label>

                        <div className="title-wraper">
                            <Tooltip position='top' title={`Task title can't be changed`}>
                                <p>{value}</p>
                            </Tooltip>
                        </div>
                    </>
                    :
                    <>
                        <div className="menu-btn-wraper">
                            {/* <PopUpMenu
                                position="bottom-start"
                                renderContent={({ onCloseModal }) => (
                                    // <SideNavModal
                                    //     onCloseModal={onCloseModal}
                                    //     board={board}
                                    //     setEditingBoardId={setEditingBoardId}
                                    //     setEditedTitle={setEditedTitle}
                                    // />
                                    <p className="temp"></p>
                                )}
                            >
                                <div className="menu-btn clickable clear size-24 icon-btn i-Menu" />
                            </PopUpMenu> */}
                            <PopUpMenu
                                position="bottom-start"
                                renderContent={({ onCloseModal }) => (
                                    <ColumnMenu
                                        onCloseModal={onCloseModal}
                                        column={column}
                                    />
                                )}
                            >
                                <div className="menu-btn clickable clear size-24 icon-btn i-Menu" />
                            </PopUpMenu>


                        </div>
                        <div className="title-wraper">
                            <Tooltip position='top' title={value}>
                                <EditableText
                                    value={value}
                                    emojiPicker={false}
                                    centered={true}
                                    size="small"
                                    handleChange={handleChange}
                                    onBlur={onUpdateColumnName}
                                    onPressEnter={onUpdateColumnName}
                                    additionalClass="test"

                                />
                            </Tooltip>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}