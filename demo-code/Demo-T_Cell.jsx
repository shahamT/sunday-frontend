import { CellContentDate } from "./T_CellContent/CellContentDate"
import { CellContentItem } from "./T_CellContent/CellContentItem"
import { CellContentPeople } from "./T_CellContent/CellContentPeople"
import { CellContentStatus } from "./T_CellContent/CellContentStatus"
import { CellContentText } from "./T_CellContent/CellContentText"
import { CellContentNumber } from "./T_CellContent/CellContentNumber"
import { CellContentFile } from "./T_CellContent/CellContentFile"

// ====== T_Cell Component ======
// ==============================

export function T_Cell({ column, columnValue, task, groupId }) {

  const componentMap = {
    item: CellContentItem,
    status: CellContentStatus,
    date: CellContentDate,
    people: CellContentPeople,
    text: CellContentText,
    number: CellContentNumber,
    file: CellContentFile,
  };

  const variant = column.type.variant
  const DynamicComponent = componentMap[variant]

  return (
    <section className="T_Cell">

      {DynamicComponent && (
        <DynamicComponent
          column={column}
          columnValue={columnValue}
          task={task}
          groupId={groupId}
        />
      )}
    </section>
  )
}