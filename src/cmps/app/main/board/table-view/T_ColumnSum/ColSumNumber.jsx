// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ColSumNumber({ column,columnValues }) {
    // === Consts

    // === Effects

    // === Functions
const sum= columnValues.reduce((acc,currNun)=>{
    return acc+ currNun
},0)

    // if (!data) return <div>Loading...</div>
    return (
        <section className="ComponentName">
            <p>{sum}</p>
            <p>sum</p>
        </section>
    )
}