// === Libs
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners
} from '@dnd-kit/core'
import {
  SortableContext,
  rectSortingStrategy
} from '@dnd-kit/sortable'

// === Actions
import { addGroup, moveTask } from '../../../../../store/actions/board.actions'
import { store } from '../../../../../store/store'

// === Hooks / React
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

// === Child Components
import { T_Group } from './T_Group'

// ====== Component ======
// =======================

export function T_GroupsList({}) {
  // === Consts
  const storeBoard = useSelector(storeState => storeState.boardModule.board)
  const boards = useSelector(storeState => storeState.boardModule.boards)
  const [board, setBoard] = useState(null)
  const liveColumnWidthsRef = useRef({})
  const [resizeVersion, setResizeVersion] = useState(0)
  const filterBy = useSelector(storeState => storeState.boardModule.filterBy)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
      eventOptions: { passive: false }
    })
  )

  function bumpResizeVersion() {
    setResizeVersion(v => v + 1)
  }

  useEffect(() => {
    if (storeBoard) setBoard(storeBoard)
  }, [storeBoard])

  useEffect(() => {
    if (!storeBoard) return
    
    const regex = filterBy.txt ? new RegExp(filterBy.txt, 'i') : null
    const peopleCol = storeBoard.columns.find(col => col.type?.variant === 'people')
    const personId = filterBy.person
    
    if (!regex && !personId) {
      setBoard(storeBoard)
      return
    }

    const filteredGroups = storeBoard.groups.map(group => {
    const groupNameMatches = regex?.test(group.name)
    const matchingTasks = group.tasks.filter(task => {
      let matchesText = true
      let matchesPerson = true

    if (regex) {
      const taskName = task.columnValues[0]?.value || ''
      const taskMatches = regex.test(taskName)
      matchesText = groupNameMatches || taskMatches
    }

    if (personId && peopleCol) {
      matchesPerson = task.columnValues.some(cv =>
          cv.colId === peopleCol.id &&
          Array.isArray(cv.value) &&
          cv.value.some(user => user._id === personId)
      )
    }
    return matchesText && matchesPerson
    })

    if (matchingTasks?.length) {
      return {
        ...group,
        tasks: matchingTasks
      }
    }

    return null
  }).filter(Boolean)

  setBoard({...storeBoard, groups: filteredGroups})

  }, [filterBy, storeBoard])

  // === Functions
  function onAddGroup() {
    addGroup({isTop: false})
  }

  const [activeId, setActiveId] = useState(null)

  function handleDragStart({ active }) {
    setActiveId(active.id)
  }

  function handleDragEnd({ active, over }) {
    setActiveId(null)

    if (!over || active.id === over.id) return
    if (!active.id.includes('|') || !over.id.includes('|')) return

    const [activeTaskId, fromGroupId] = active.id.split('|')
    const [overTaskId, toGroupId] = over.id.split('|')

    const board = store.getState().boardModule.board
    const fromGroup = board.groups.find(group => group.id === fromGroupId)
    const toGroup = board.groups.find(group => group.id === toGroupId)
    if (!fromGroup || !toGroup) return

    const task = fromGroup.tasks.find(t => t.id === activeTaskId)
    if (!task) return

    const overIndex = toGroup.tasks.findIndex(t => t.id === overTaskId)
    const isDifferentGroup = fromGroupId !== toGroupId

    const insertIndex = overIndex === -1
      ? toGroup.tasks.length
      : isDifferentGroup
        ? overIndex + 1
        : overIndex

    const currentIndex = fromGroup.tasks.findIndex(t => t.id === activeTaskId)
    if (
      fromGroupId === toGroupId &&
      (currentIndex === insertIndex || currentIndex + 1 === insertIndex)
    ) return

    moveTask({
      task,
      fromGroupId,
      toGroupId,
      toIndex: insertIndex
    })
  }

  if (!board) return <div className="main-loader-container" >
    <img className="loader" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747552268/loader_cymybj.gif" alt="loader" />
  </div>

  if (board.groups.length === 0) return(
    <div className='groups-list-search-empty-state'>
      <img className="empty-state-img" src="https://res.cloudinary.com/dqaq55tup/image/upload/v1747683629/search_empty_state_asg7zu.svg" />
      <p className='empty-state-title'>No results found</p>
      <p className='empty-state-subtitle'>Try using different search term...</p>
    </div>
  )

    return (
      <section className="T_GroupsList">

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={
              board.groups.flatMap(group => [
                `__start__|${group.id}`,
                ...group.tasks.map(task => `${task.id}|${group.id}`),
                `__end__|${group.id}`
              ])
            }
            strategy={rectSortingStrategy}
          >
            {board.groups.map(group => (
              <T_Group
                key={group.id}
                group={group}
                columns={board.columns}
                liveColumnWidthsRef={liveColumnWidthsRef}
                resizeVersion={resizeVersion}
                bumpResizeVersion={bumpResizeVersion}
                activeId={activeId}

              />
            ))}
          </SortableContext>
        </DndContext>

        <div
          className="add-group-btn clickable clear outlined size-32 icon-start i-Add"
          onClick={onAddGroup}
        >Add group item</div>

      </section>
    )
}
