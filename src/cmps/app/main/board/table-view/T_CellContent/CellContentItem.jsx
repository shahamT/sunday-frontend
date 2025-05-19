// === Hooks / React
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// === Child Components
import { EditableText } from '../../../../../reusables/EditableText/EditableText'
import { useControlledInput } from '../../../../../../hooks/useControlledInput'
import { setColumnValue } from '../../../../../../store/actions/board.actions'

// ====== Component ======
// =======================

export function CellContentItem({ column, columnValue, task, groupId, dragListeners = {} }) {
  // === Consts
  const taskId = task.id
  const [value, handleChange, reset, set] = useControlledInput(columnValue?.value)
  const navigate = useNavigate()
  const board = useSelector(storeState => storeState.boardModule.board)
  const wasDraggingRef = useRef(false)

  // === Effects
  useEffect(() => {
    set(columnValue?.value)
  }, [columnValue?.value])

  // === Functions
  function onOpenTaskDetails(ev) {
    ev.stopPropagation()
    navigate(`/app/board/${board._id}/task/${taskId}`)
  }

  function onSetName() {
    if (value === '') {
      showErrorMsg(`Item name can't be empty`)
      set(columnValue?.value)
      return
    }

    try {
      setColumnValue(taskId, column.id, value, columnValue.value)
    } catch (err) {
      showErrorMsg(`Somthing went wrong`)
    }
  }


  const updatesAmount = task?.updates?.length
  
  return (
    <div
      className="CellContentItem cell-content"
      onClick={onOpenTaskDetails}
      {...dragListeners}
    >

      <label
        htmlFor={`t${taskId}`}
        className="checkbox-container"
        onPointerDown={() => {
          wasDraggingRef.current = false
        }}
        onPointerMove={() => {
          wasDraggingRef.current = true
        }}
      >
        <input
          type="checkbox"
          id={`t${taskId}`}
          onClick={(e) => {
            if (wasDraggingRef.current) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        />
      </label>

      <div
        className="text-container"
        onPointerDown={(e) => {
          if (
            e.target.tagName === 'INPUT' ||
            e.target.tagName === 'TEXTAREA' ||
            e.target.isContentEditable
          ) {
            e.stopPropagation()
          }
        }}
      >
        <EditableText
          size="small"
          value={value}
          // full={true}
          handleChange={handleChange}
          onBlur={onSetName}
          onPressEnter={onSetName}
        />
      </div>

      <div className="expand-icon-wraper">
        <div className="expand-icon i-Open"></div>
      </div>

      <div className="updates-indicator">
        {updatesAmount > 0
          ?
          <div className="updates-counter i-Update">
            <p className="counter">{updatesAmount}</p>
          </div>
          :
          <div className="add-update i-AddUpdate"></div>
        }

      </div>

    </div>
  )
}
