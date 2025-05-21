export function T_ColumnBody({ column, group }) {
  const columnValues = group.tasks.reduce((acc, task) => {
    const colValue = task.columnValues.find(col => col.colId === column.id)?.value
    acc.push(colValue !== undefined ? colValue : "")
    return acc
  }, [])


  return (
    <div className="T_ColumnBody">
      {columnValues.map((value, idx)  => (
        <div key={idx} className="cell-value">
          <p>{JSON.stringify(value)}</p>
        </div>
      ))}
    </div>
  )
}