export function T_TaskRow({
  task,
  columns,
  group,
  isOverlay = false,
  isBuffer = false,
  liveColumnWidthsRef,
}) {
  return (
    <article
      ref={setNodeRef}
      className={`T_TaskRow ${isMenuOpen ? "menu-in-focus" : ""} ${
        isDragging ? "dragging" : ""
      } ${isOverlay ? "overlay" : ""}`}
      style={style}
      {...attributes}
    >
      {columns.map((column, idx) => {
        const columnValue = task.columnValues.find(
          (cv) => cv.colId === column.id
        );
        return (
          <T_Cell
            key={column.id + idx}
            column={column}
            columnValue={columnValue}
            task={task}
            groupId={group.id}
            listeners={listeners}
            isOverlay={isOverlay}
            liveColumnWidthsRef={liveColumnWidthsRef}
          />
        );
      })}

      <div className="empty-last-cell"></div>
    </article>
  );
}

export function T_Cell({
  column,
  columnValue,
  task,
  groupId,
  listeners,
  isOverlay,
}) {
  const componentMap = {
    item: CellContentItem,
    status: CellContentStatus,
    date: CellContentDate,
    people: CellContentPeople,
    text: CellContentText,
    number: CellContentNumber,
    file: CellContentFile,
  };

  const variant = column.type.variant;
  const DynamicComponent = componentMap[variant];

  return (
    <section>
      {DynamicComponent && (
        <DynamicComponent
          column={column}
          columnValue={columnValue}
          task={task}
          groupId={groupId}
          {...(variant === "item" ? { dragListeners: listeners } : {})}
        />
      )}
    </section>
  );
}
