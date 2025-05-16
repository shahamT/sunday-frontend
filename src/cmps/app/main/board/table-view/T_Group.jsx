// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { T_ColumnSumRow } from "./T_ColumnSumRow";
import { T_GroupFooter } from "./T_GroupFooter";
import { T_GroupHeader } from "./T_GroupHeader";
import { T_GroupHeadRow } from "./T_GroupHeadRow";
import { T_TaskRow } from "./T_TaskRow";

// ====== Component ======
// =======================

export function T_Group({ group, columns, liveColumnWidthsRef, resizeVersion, bumpResizeVersion }) {
    // === Consts

    // === Effects

    // === Functions
    // console.log("columns: ", columns)
    // if (!data) return <div>Loading...</div>
    const itemColumn = columns.find(col => col.type?.variant === 'item');


    return (
        <section className="T_Group">

            <T_GroupHeader group={group} />
            <T_GroupHeadRow
                group={group}
                columns={columns}
                liveColumnWidthsRef={liveColumnWidthsRef}
                resizeVersion={resizeVersion}
                bumpResizeVersion={bumpResizeVersion}
            />


            {group.tasks.map(task => (
                <T_TaskRow
                    key={task.id}
                    task={task}
                    columns={columns}
                    group={group}
                />
            ))}

            <T_GroupFooter group={group} itemColumn={itemColumn} />
            <T_ColumnSumRow columns={columns} group={group} />
        </section>
    )
}