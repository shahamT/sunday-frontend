// === Libs



// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { CellContentDate } from "./T_CellContent/CellContentDate";
import { CellContentItem } from "./T_CellContent/CellContentItem";
import { CellContentPerson } from "./T_CellContent/CellContentPerson";
import { CellContentStatus } from "./T_CellContent/CellContentStatus";

// ====== Component ======
// =======================

export function T_Cell({ column, columnValue , taskId}) {
    // === Consts

    // === Effects

    // === Functions

    const componentMap = {
        item: CellContentItem,
        status: CellContentStatus,
        date: CellContentDate,
        person: CellContentPerson,
    }

    const variant = column.type.variant
    const DynamicComponent = componentMap[variant]
    return (
        <section
            className={`T_Cell t-cell ${variant === 'item' ? 'no-divider sticky' : ''}`}
            style={{ width: column.width + 'px'}}
        >
            {DynamicComponent && <DynamicComponent column={column} columnValue={columnValue} taskId={taskId}/>}

        </section>
    )
}