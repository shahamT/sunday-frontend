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
import { useEffect, useRef, useState } from "react";
import { ColumnMenu } from "../popupMenu/ColumnMenu";

// ====== Component ======
// =======================

export function T_ColumnHeaderCell({ column, groupId, liveColumnWidthsRef, bumpResizeVersion }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput(column.name)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [width, setWidth] = useState(column.width)
    const [isDragging, setIsDragging] = useState(false)
    const [hasMouseDown, setHasMouseDown] = useState(false)
    const liveWidth = useRef(column.width);
    const startX = useRef(0)
    const startWidth = useRef(0)


    // === Effects
    useEffect(() => {
        set(column.name);

        // only set width if it’s different than local
        if (column.width !== width) {
            setWidth(column.width);
        }
    }, [column.name, column.width]);

    // === Functions

    // resize dragging 
    function onMouseDown(e) {
        e.stopPropagation()
        setHasMouseDown(true)          // 🔹 start tracking immediately
        setIsDragging(true)

        startX.current = e.clientX
        startWidth.current = column.width
        liveWidth.current = column.width;

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    function onMouseMove(e) {
        const deltaX = e.clientX - startX.current;
        const newWidth = Math.max(100, startWidth.current + deltaX);

        // 🔹 Write live width to shared ref
        if (liveColumnWidthsRef?.current) {
            liveColumnWidthsRef.current[column.id] = newWidth;
        }

        // 🔹 Trigger re-render in other columns
        if (bumpResizeVersion) bumpResizeVersion();

        liveWidth.current = newWidth;
        setWidth(newWidth);
    }


    function onMouseUp(e) {
        setIsDragging(false)
        setHasMouseDown(false)

        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

        const deltaX = e.clientX - startX.current
        const finalWidth = Math.max(100, startWidth.current + deltaX)
        setWidth(finalWidth)
        updateColumnWidth(finalWidth)
    }

    function updateColumnWidth(updatedWidth) {
        const updatedColumn = { ...column, width: updatedWidth }
        console.log("width: ", updatedWidth)
        try {
            updateColumn(updatedColumn)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }


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
            className={`T_ColumnHeaderCell ${variant === 'item' ? 'item-column' : ''} ${isMenuOpen ? 'menu-in-focus' : ''}`}
            style={{ width: (liveColumnWidthsRef?.current?.[column.id] ?? width) + 'px' }}
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

                            <PopUpMenu
                                position="bottom-start"
                                onOpen={() => setIsMenuOpen(true)}
                                onClose={() => setIsMenuOpen(false)}
                                renderContent={({ onCloseModal }) => (
                                    <ColumnMenu
                                        onCloseModal={onCloseModal}
                                        column={column}
                                    />
                                )}
                            >
                                <div className={`menu-btn clickable clear size-24 icon-btn i-Menu ${isMenuOpen ? 'in-focus' : ''}`} />
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
            <div className="column-resize-handle" onMouseDown={onMouseDown} />
            {isDragging && (
                <div
                    className="column-drag-overlay"
                    style={{ pointerEvents: hasMouseDown ? 'all' : 'none' }}
                />
            )}
        </div>
    )
}