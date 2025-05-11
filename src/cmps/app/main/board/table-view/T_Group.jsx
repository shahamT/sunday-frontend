// === Libs



// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { T_GroupFooter } from "./T_GroupFooter";
import { T_GroupHeader } from "./T_GroupHeader";
import { T_GroupHeadRow } from "./T_GroupHeadRow";
import { T_GroupTasksList } from "./T_GroupTasksList";

// ====== Component ======
// =======================

export function T_Group({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="T_Group">
            <T_GroupHeader/>
            <T_GroupHeadRow/>
            <T_GroupTasksList/>
            <T_GroupFooter/>
        </section>
    )
}