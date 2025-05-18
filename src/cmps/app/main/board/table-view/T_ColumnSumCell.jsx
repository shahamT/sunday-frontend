// === Libs



// === Services

// === Actions

// === Hooks / React
import { ColSumNumber } from "./T_ColumnSum/ColSumNumber";
import { ColSumFile } from "./T_ColumnSum/ColSumFile";
import { ColSumStatus } from "./T_ColumnSum/ColSumStatus";
import { ColSumPeople } from "./T_ColumnSum/ColSumPeople";
import { ColSumDate } from "./T_ColumnSum/ColSumDate";

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
    status: ColSumStatus,
    date: ColSumDate,
    people: ColSumPeople,
    text: '',
    file:ColSumFile,
    number: ColSumNumber,
  };
  // const columnValue= group.tasks.columnValue.colId[]
  const variant = column.type.variant
  const DynamicComponent = componentMap[variant]




  return (
    <section
    className={`T_ColumnSumCell`}
    >
      {DynamicComponent && (
        <DynamicComponent column={column} columnValues={columnValues} group={group} />
      )}
    </section>
  )
}

