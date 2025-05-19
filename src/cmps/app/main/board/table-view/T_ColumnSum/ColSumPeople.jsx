// === Libs

import { PersonsPreview } from "../T_CellContent/PersonsPreview"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ColSumPeople({columnValues}) {

    // === Consts

    const relevantValues = columnValues.flat().reduce((acc, people) => {
        if (!acc.find(p => p._id === people._id)) acc.push(people)
        return acc
      }, [])


    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="col-sum-people">
           <PersonsPreview selectedPersons={relevantValues} amount={2} />
        </section>
    )
}