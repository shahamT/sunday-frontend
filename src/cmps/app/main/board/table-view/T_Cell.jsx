// === Libs



// === Services

// === Actions

// === Hooks / React
import { useRef, useEffect } from "react";

// === Imgs

// === Child Components
import { CellContentDate } from "./T_CellContent/CellContentDate";
import { CellContentItem } from "./T_CellContent/CellContentItem";
import { CellContentPerson } from "./T_CellContent/CellContentPerson";
import { CellContentStatus } from "./T_CellContent/CellContentStatus";
import { CellContentText } from "./T_CellContent/CellContentText";

// ====== Component ======
// =======================

// export function T_Cell({ column, columnValue , taskId}) {
//     // === Consts

//     // === Effects

//     // === Functions

//     const componentMap = {
//         item: CellContentItem,
//         status: CellContentStatus,
//         date: CellContentDate,
//         person: CellContentPerson,
//     }

//     const variant = column.type.variant
//     const DynamicComponent = componentMap[variant]
//     return (
//         <section
//             className={`T_Cell t-cell ${variant === 'item' ? 'no-divider sticky' : ''}`}
//             style={{ width: column.width + 'px'}}
//         >
//             {DynamicComponent && <DynamicComponent column={column} columnValue={columnValue} taskId={taskId}/>}

//         </section>
//     )
// }

export function T_Cell({ column, columnValue, taskId }) {
  const cellRef = useRef(null);

  // Attach global listener to detect clicks outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (cellRef.current && !cellRef.current.contains(e.target)) {
        cellRef.current.blur(); // 🔥 remove focus
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const componentMap = {
    item: CellContentItem,
    status: CellContentStatus,
    date: CellContentDate,
    person: CellContentPerson,
    text: CellContentText,
  };

  const variant = column.type.variant;
  const DynamicComponent = componentMap[variant];

  return (
    <section
      ref={cellRef}
      tabIndex={-1}
      onClick={() => cellRef.current?.focus()} // 🔥 set focus on any inner click
      className={`T_Cell t-cell ${variant === "item" ? "no-divider sticky" : ""}`}
      style={{ width: column.width + "px" }}
    >
      {DynamicComponent && (
        <DynamicComponent column={column} columnValue={columnValue} taskId={taskId} />
      )}
    </section>
  );
}