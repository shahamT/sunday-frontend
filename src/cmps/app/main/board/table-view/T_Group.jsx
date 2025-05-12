// === Libs



// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { T_GroupFooter } from "./T_GroupFooter";
import { T_GroupHeader } from "./T_GroupHeader";
import { T_GroupHeadRow } from "./T_GroupHeadRow";
import { T_TaskRow } from "./T_TaskRow";

// ====== Component ======
// =======================

export function T_Group({ group, columns}) {
    // === Consts

    // === Effects

    // === Functions
// console.log("columns: ", columns)
    // if (!data) return <div>Loading...</div>
const itemColumnWidth = columns.reduce((acc, col) =>
  col.type?.variant === 'item' ? col.width : acc, 0)

    return (
        <section className="T_Group">

            <T_GroupHeader group={group} />
            
            <T_GroupHeadRow group={group} columns={columns}/>

            {group.tasks.map(task => {
                return <T_TaskRow key={task.id} task={task} columns={columns} />
            })}

            <T_GroupFooter group={group} itemColumnWidth={itemColumnWidth}/>
        </section>
    )
}