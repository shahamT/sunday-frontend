// === Libs



// === Services

// === Actions

// === Hooks / React
import { useRef, useEffect } from "react";
import { ColSumNumber } from "./T_ColumnSum/ColSumNumber";

// === Imgs

// === Child Components


// ====== Component ======
// =======================

export function T_ColumnSumCell({ group, column }) {
  const columnValues = group.tasks.reduce((acc, task) => {
    const colValue = task.columnValues.find(col => col.colId === column.id)?.value
    if (colValue !== undefined) acc.push(colValue)
    return acc
  }, [])
  // group.tasks[i].columnValues.find(col => col.colId === column.id)?.value
  // Attach global listener to detect clicks outside

  const componentMap = {
    item: '',
    status: '',
    date: '',
    people: '',
    text: '',
    number: ColSumNumber,
  };
  // const columnValue= group.tasks.columnValue.colId[]
  const variant = column.type.variant
  const DynamicComponent = componentMap[variant]





  return (
    <section
      className={`T_ColumnSumCell`}
      style={{ width: column.width + "px" }}
    >
      {DynamicComponent && (
        <DynamicComponent column={column} columnValues={columnValues} />
      )}
    </section>
  )
}