
// ====== CellPreview Component ======
// ==============================

export function CellPreview({ column, columnValue, task, groupId }) {

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
    <section className="CellPreview">

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