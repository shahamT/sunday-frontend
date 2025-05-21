import { T_Cell } from "./T_Cell"

export function T_ColumnBody({ column, group }) {
  return (
    <div className="T_ColumnBody">
      {group.tasks.map((task, idx) => {
        const value = task.columnValues.find(col => col.colId === column.id)?.value || ""
        return (
          <div key={idx} className="cell-value">
            <T_Cell
              column={column}
              columnValue={value}
              task={task}
              groupId={group.id}
              listeners={null}
              isOverlay={true}
            />
          </div>
        )
      })}
    </div>
  )
}
