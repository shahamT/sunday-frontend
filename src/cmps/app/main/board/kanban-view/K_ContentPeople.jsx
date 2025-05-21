// === Libs

// === Services

// === Actions

// === Hooks / React
import { useSelector } from "react-redux"

// === Imgs

// === Child Components
import { PersonsPreview } from "../table-view/T_CellContent/PersonsPreview"

// ====== Component ======
// =======================

export function K_ContentPeople({ column, value }) {
    // === Consts
    const users = useSelector(storeState => storeState.userModule.users)
    const personsArray = users.filter(user => value.includes(user._id))
    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_ContentPeople">
            <PersonsPreview selectedPersons={personsArray} amount={1} />
        </section>
    )
}