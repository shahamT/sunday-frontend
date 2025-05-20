export function T_ColumnBody({ column, group }) {
  const columnValues = group.tasks.reduce((acc, task) => {
    const colValue = task.columnValues.find(col => col.colId === column.id)?.value
    acc.push(colValue !== undefined ? colValue : "")
    return acc
  }, [])


  console.log(columnValues)
  return (
    <div className="T_ColumnBody">
      {columnValues.map(value => (
        <div key={value.id} className="cell-value">
          <p>{value}</p>
        </div>
      ))}
    </div>
  )
}