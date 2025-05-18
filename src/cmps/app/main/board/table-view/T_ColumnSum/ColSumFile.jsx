// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ColSumFile({ columnValues }) {
    // === Consts
    // === Effects
const sum = columnValues.length
    // === Functions

    // if (!data) return <div>Loading...</div>
   return (
        <section className="col-sum-file">
            <p>{sum}</p>
            {sum===1 ? <p>file</p>
            :<p>files</p> 
            }
        </section>
    )
}