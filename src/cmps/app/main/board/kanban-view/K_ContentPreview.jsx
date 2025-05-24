// === Libs

// === Services

// === Actions

// === Hooks / React
import { useSelector } from "react-redux";

// === Imgs

// === Child Components
import { K_ContentDate } from "./K_ContentDate"; 
import { K_ContentItem } from "./K_ContentItem";
import { K_ContentPeople } from "./K_ContentPeople";
import { K_ContentStatus } from "./K_ContentStatus";
import { K_ContentText } from "./K_ContentText";
import { K_ContentNumber } from "./K_ContentNumber";
import { K_ContentFile } from "./K_ContentFile";

// ====== Component ======
// =======================

export function K_ContentPreview({ colId, value, taskId }) {
    // === Consts
    const componentMap = {
        // item: K_ContentItem,
        status: K_ContentStatus,
        date: K_ContentDate,
        // people: K_ContentPeople,
        text: K_ContentText,
        number: K_ContentNumber,
        // file: K_ContentFile,
      }
    const columns = useSelector(storeState => storeState.boardModule.board.columns)
    const column = columns.find(col => col.id === colId)
    const variant = column?.type?.variant
    const DynamicComponent = componentMap[variant]
    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
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