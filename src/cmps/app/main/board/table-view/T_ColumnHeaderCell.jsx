// === Libs

// === Services

// === Actions
import { updateColumn } from "../../../../../store/actions/board.actions";

// === Hooks / React
import { useControlledInput } from "../../../../../hooks/useControlledInput";

// === D & D
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// === Child Components
import { EditableText } from "../../../../reusables/EditableText/EditableText";
import { Tooltip } from "../../../../reusables/tooltip/Tooltip";
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu";
import { useEffect, useRef, useState } from "react";
import { ColumnMenu } from "../popupMenu/ColumnMenu";

// ====== Component ======
// =======================

export function T_ColumnHeaderCell({ column,  isDraggingOverlay  ,isOver, groupId, liveColumnWidthsRef, bumpResizeVersion }) {
    // D & D
    const variant = column.type.variant
    const sortable = variant !== 'item' ? useSortable({ id: column.id }) : null
    const [canDrag, setCanDrag] = useState(false)
    const [isInputFocused, setIsInputFocused] = useState(false)
    const dragTimeoutRef = useRef(null)
    const pressStartTimeRef = useRef(null)


    const style = sortable
        ? { transform: CSS.Transform.toString(sortable.transform), transition: sortable.transition }
        : {}

    const setNodeRef = sortable?.setNodeRef || undefined
    const listeners = sortable?.listeners || {}
    const attributes = sortable?.attributes || {}
    const isDraggingClass = sortable?.isDragging ? 'is-dragging' : ''
    // const isDragging = sortable?.isDragging


    // === Consts
    const [value, handleChange, reset, set] = useControlledInput(column.name)
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    // === Effects
    useEffect(() => {
        // update input value dynamically if it's changed in the database
        set(column.name)
    }, [column.name])

    useEffect(() => {
        // only set width if it’s different than local
        if (column.width !== width) {
            setWidth(column.width)
        }
    }, [column.width])

    useEffect(() => {
        if (canDrag) {
          document.body.classList.add('drag-mode')
        } else {
          document.body.classList.remove('drag-mode')
        }
      }, [canDrag])


    // resize columns 
    const [width, setWidth] = useState(column.width)
    const [isDragging, setIsDragging] = useState(false)
    const [hasMouseDown, setHasMouseDown] = useState(false)
    const liveWidth = useRef(column.width)

    const startX = useRef(0)
    const startWidth = useRef(0)

    function onMouseDown(e) {
        e.stopPropagation()
        setHasMouseDown(true)      // start tracking
        setIsDragging(true)

        startX.current = e.clientX
        startWidth.current = column.width
        liveWidth.current = column.width

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    function onMouseMove(e) {
        const deltaX = e.clientX - startX.current;
        const minWidth = variant === 'item' ? 250 : 100;
        const newWidth = Math.max(minWidth, startWidth.current + deltaX);

        //  Write live width to shared ref
        if (liveColumnWidthsRef?.current) {
            liveColumnWidthsRef.current[column.id] = newWidth
        }

        // Trigger re-render in other columns
        if (bumpResizeVersion) bumpResizeVersion()

        liveWidth.current = newWidth
        setWidth(newWidth);
    }


    function onMouseUp(e) {
        setIsDragging(false)
        setHasMouseDown(false)

        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

        const deltaX = e.clientX - startX.current
        const minWidth = variant === 'item' ? 250 : 100;
        const finalWidth = Math.max(minWidth, startWidth.current + deltaX)
        setWidth(finalWidth)
        updateColumnWidth(finalWidth)
    }

    function updateColumnWidth(updatedWidth) {
        const updatedColumn = { ...column, width: updatedWidth }
        try {
            updateColumn(updatedColumn)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }


    // crud functions
    function onUpdateColumnName() {
        if (value === '') {
            showErrorMsg(`Column name can't be empty`)
            set(column.name)
            return
        }
        const updatedColumn = { ...column, name: value }

        try {
            updateColumn(updatedColumn)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }

    }


    function handleMouseUp() {
        clearTimeout(dragTimeoutRef.current)
        const pressDuration = Date.now() - pressStartTimeRef.current
      
        if (pressDuration < 100) {
          setCanDrag(false)
        }
      }
    function handleMouseDown() {
        if (isInputFocused) return
        pressStartTimeRef.current = Date.now()
      
        dragTimeoutRef.current = setTimeout(() => {
          setCanDrag(true)
        }, 90)
      }

    return (
        <div
            className={`T_ColumnHeaderCell ${isDraggingOverlay ? 'drag-overlay' : ''} ${isDraggingClass} ${isOver ? 'is-drag-over' : ''} ${variant === 'item' ? 'item-column' : ''} ${isMenuOpen ? 'menu-in-focus' : ''} `}
            // className={`T_ColumnHeaderCell ${variant === 'item' ? 'item-column' : ''} ${isMenuOpen ? 'menu-in-focus' : ''} `}
            ref={setNodeRef}
            style={style}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseUp}
            {...(canDrag ? { ...listeners, ...attributes } : {})}
        >


            <div className="cell-content" >
            {/* <div className={`cell-content ${isDraggingOverlay ? 'drag-overlay' : ''}  ${isOver ? 'is-drag-over' : ''} ${variant === 'item' ? 'item-column' : ''} ${isMenuOpen ? 'menu-in-focus' : ''}` }  */}
            
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
                            <Tooltip position='top' title={value} stretchWraper={true}>
                                <EditableText
                                    setIsInputFocused={setIsInputFocused}
                                    isInputFocused={isInputFocused}
                                    value={value}
                                    emojiPicker={false}
                                    centered={true}
                                    size="small"
                                    handleChange={handleChange}
                                    onClick={() => setIsInputFocused(true)}
                                    onBlur={() => {
                                        onUpdateColumnName()
                                        setIsInputFocused(false)
                                    }}
                                    onPressEnter={onUpdateColumnName}
                                    additionalClass="centered"

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