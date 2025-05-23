// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { ColSumStatus } from "../table-view/T_ColumnSum/ColSumStatus";
import { T_Filter } from "../table-view/T_Filter";

// ====== Component ======
// =======================

export function K_Filter({ columnValues, column, totalTasks }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_Filter">
            
            <T_Filter />

            <div className="status-sum">
                <ColSumStatus columnValues={columnValues} column={column} totalTasks={totalTasks} />
            </div>

        </section>
    )
}