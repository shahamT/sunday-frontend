// === Libs
import { DragOverlay, useDndContext } from '@dnd-kit/core'

// === Child Components
import { T_ColumnSumRow } from './T_ColumnSumRow'
import { T_GroupFooter } from './T_GroupFooter'
import { T_GroupHeader } from './T_GroupHeader'
import { T_GroupHeadRow } from './T_GroupHeadRow'
import { T_TaskRow } from './T_TaskRow'

// ====== Component ======
// =======================

export function T_Group({ group, columns, liveColumnWidthsRef, resizeVersion, bumpResizeVersion, activeId }) {
  // === Consts
  const itemColumn = columns.find(col => col.type?.variant === 'item')

  const [activeTaskId, activeGroupId] = activeId?.split('|') || []
  const isActiveGroup = activeGroupId === group.id
  const activeTask = group.tasks.find(t => t.id === activeTaskId)

  const templateCols = `6px ${columns
    .map(col => {
      const liveWidth = liveColumnWidthsRef?.current?.[col.id] ?? col.width
      return `${liveWidth}px`
    })
    .join(" ")} minmax(min-content, 1fr)`


  return (
    <section
      className="T_Group"
      style={{
        gridTemplateColumns: templateCols,
      }}
    >

      <T_GroupHeader group={group} />
      <T_GroupHeadRow
        group={group}
        columns={columns}
        liveColumnWidthsRef={liveColumnWidthsRef}
        resizeVersion={resizeVersion}
        bumpResizeVersion={bumpResizeVersion}
      />


      <T_TaskRow
        key={`__start__|${group.id}`}
        task={{ id: `__start__`, columnValues: [] }}
        columns={columns}
        group={group}
        isBuffer
      />

      {group.tasks.map(task => (
        <T_TaskRow
          key={task.id}
          task={task}
          columns={columns}
          group={group}
        />
      ))}

      <T_TaskRow
        key={`__end__|${group.id}`}
        task={{ id: `__end__`, columnValues: [] }}
        columns={columns}
        group={group}
        isBuffer
      />

      {isActiveGroup && activeTask && (
        <DragOverlay dropAnimation={null}>
          <section className="T_Group T_Group--overlay">
            <T_TaskRow
              task={activeTask}
              columns={columns}
              group={group}
              isOverlay={true}
            />
          </section>
        </DragOverlay>
      )}


      <T_GroupFooter group={group} itemColumn={itemColumn} columns={columns} />
      <T_ColumnSumRow columns={columns} group={group} />

    </section>
  )
}
