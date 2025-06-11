// === Libs

// === Services

// === Actions

// === Hooks / React
import { useSelector } from "react-redux";

// === Imgs

// === Child Components
import { K_ContentDate } from "./K_ContentDate"; 
import { K_ContentStatus } from "./K_ContentStatus";
import { K_ContentText } from "./K_ContentText";
import { K_ContentNumber } from "./K_ContentNumber";

// ====== Component ======
// =======================

export function K_ContentPreview({ colId, value, taskId }) {
    // === Consts
    const componentMap = {
        status: K_ContentStatus,
        date: K_ContentDate,
        text: K_ContentText,
        number: K_ContentNumber,
      }
    const columns = useSelector(storeState => storeState.boardModule.board.columns)
    const column = columns.find(col => col.id === colId)
    const variant = column?.type?.variant
    const DynamicComponent = componentMap[variant]
    // === Effects

    // === Functions

    return (
        <section className="K_ContentPreview">

        {DynamicComponent && (
            <DynamicComponent
            column={column}
            value={value}
            taskId={taskId}
            />
        )}

        </section>
    )
}