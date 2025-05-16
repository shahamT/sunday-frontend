// === Libs



// === Services

// === Actions

// === Hooks / React
import { useRef, useEffect } from "react";

// === Imgs

// === Child Components
import { CellContentDate } from "./T_CellContent/CellContentDate";
import { CellContentItem } from "./T_CellContent/CellContentItem";
import { CellContentPeople } from "./T_CellContent/CellContentPeople";
import { CellContentStatus } from "./T_CellContent/CellContentStatus";
import { CellContentText } from "./T_CellContent/CellContentText";
import { CellContentNumber } from "./T_CellContent/CellContentNumber";
import { CellContentFile } from "./T_CellContent/CellContentFile";

// ====== Component ======
// =======================

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
    people: CellContentPeople,
    text: CellContentText,
    number: CellContentNumber,
    file: CellContentFile,
  };

  const variant = column.type.variant;
  const DynamicComponent = componentMap[variant];

  return (
    <section
      ref={cellRef}
      tabIndex={-1}
      onClick={() => cellRef.current?.focus()} // 🔥 set focus on any inner click
      className={`T_Cell ${variant === "item" ? "no-divider sticky" : ""}`}
    >
      {DynamicComponent && (
        <DynamicComponent column={column} columnValue={columnValue} taskId={taskId} />
      )}
    </section>
  );
}