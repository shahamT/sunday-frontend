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
import { useRef, useState } from 'react'

// === Child Components
import { T_Group } from './T_Group'

// ====== Component ======
// =======================

export function T_GroupsList() {
  // === Consts
  const board = useSelector(storeState => storeState.boardModule.board)
  const liveColumnWidthsRef = useRef({})
  const [resizeVersion, setResizeVersion] = useState(0)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
      eventOptions: { passive: false }
    })
  )

  function bumpResizeVersion() {
    setResizeVersion(v => v + 1)
  }

  // === Functions
  function onAddGroup() {
    addGroup()
  }

  function handleDragEnd({ active, over }) {
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
    const insertIndex = overIndex === -1 ? toGroup.tasks.length : overIndex

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

  if (!board) return <div>Loading...</div>

  return (
    <section className="T_GroupsList">

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={
            board.groups.flatMap(group =>
              group.tasks.map(task => `${task.id}|${group.id}`)
            )
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
