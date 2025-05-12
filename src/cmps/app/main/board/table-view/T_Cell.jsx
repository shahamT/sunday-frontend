// === Libs



// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { CellContentStatus } from "./T_CellContent/CellContentStatus";

// ====== Component ======
// =======================

export function T_Cell({ column, columnValue }) {
    // === Consts

    // === Effects

    // === Functions

    const componentMap = {
        item: CellContentStatus,
        status: CellContentStatus,
        date: CellContentStatus,
        person: CellContentStatus,
    }

    const variant = column.type.variant
    const DynamicComponent = componentMap[variant]

    return (
        <section
            className="T_Cell t-cell"
            style={{ width: column.width + 'px' }}
        >
            {DynamicComponent && <DynamicComponent />}

        </section>
    )
}