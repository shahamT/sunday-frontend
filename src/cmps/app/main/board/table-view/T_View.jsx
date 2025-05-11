// === Libs


// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components
import { T_Filter } from "./T_Filter";
import { T_GroupsList } from "./T_GroupsList";

// ====== Component ======
// =======================

export function T_View({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="T_View">
           <T_Filter/>
           <T_GroupsList/>
        </section>
    )
}