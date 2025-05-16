// === Libs



// === Services

// === Actions

// === Hooks / React
import { useRef, useEffect } from "react";

// === Imgs

// === Child Components


// ====== Component ======
// =======================

export function T_ColumnSumCell({ column }) {


  // Attach global listener to detect clicks outside

  const componentMap = {
    item: '',
    status: '',
    date: '',
    people: '',
    text: '',
    number: '',
  };

  const variant = column.type.variant;
  const DynamicComponent = componentMap[variant];

  return (
    <section
    className={`T_ColumnSumCell`}
    style={{ width: column.width + "px" }}
    >
      {DynamicComponent && (
        <DynamicComponent column={column} columnValue={columnValue} taskId={taskId} />
      )}
    </section>
  );
}