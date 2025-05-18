import { Tooltip } from "../../../../../reusables/tooltip/Tooltip"

export function ColSumStatus({ columnValues, column, group }) {
  const totalItems = group.tasks.length
  const lableSummary = lableCounter(columnValues, column)
  const lableSummeryPrecent = precentCalculate(lableSummary)
  const tasksWithStatus= Object.values(lableSummary).reduce((sum, label) => sum + label.count, 0)

  function lableCounter(columnValues, column) {
    const lableSummary = {}

    columnValues.forEach(labelId => {
      const labelObj = column.type.labels.find(lbl => lbl.id === labelId)

      const labelName = labelObj?.name || 'Unlabeled'
      const labelColor = labelObj?.color || 'american_gray'

      if (!lableSummary[labelName]) {
        lableSummary[labelName] = { count: 0, color: labelColor }
      }

      lableSummary[labelName].count += 1
    })

    return lableSummary
  }

  function precentCalculate(lableSummary) {
    const percentByLabel = {}
    for (const labelName in lableSummary) {
      const count = lableSummary[labelName].count
      percentByLabel[labelName] = Math.round((count / totalItems) * 100)
    }
    return percentByLabel
  }

  const usedPercent = Object.values(lableSummeryPrecent).reduce((sum, val) => sum + val, 0)
  const remainingPercent = 100 - usedPercent

  return (
    <section className="col-sum-status sum-cell-content">
      {Object.entries(lableSummeryPrecent).map(([labelName, percent]) => {
        const color = lableSummary[labelName].color

        return (
          //     <Tooltip
          //     key={labelName}
          //     title={`${labelName} ${lableSummary[labelName].count}/${totalItems}   ${percent}%`}
          //     position="top"
          //     stretchWraper= {true}

          //   >
          <div
            key={labelName}
            className={`label-status-item ${color}-bg-static`}
            style={{
              width: `${percent}%`,
            }}
            title={`${labelName} ${lableSummary[labelName].count}/${totalItems}   ${percent}%`}
          />
          //  </Tooltip>
        )
      })}
        {remainingPercent > 0 && (
        <div
          className={`label-status-item default-status `}
          style={{ width: `${remainingPercent}%` }}
          title={`${tasksWithStatus}/${totalItems} ${remainingPercent}%`}
        />
      )}
    </section>
  )
}
