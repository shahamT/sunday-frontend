// === Libs


// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function CellContentStatus({ column, columnValue }) {
    // === Consts
    console.log("columnValue: ", columnValue)
    // === Effects

    // === Functions


    return (
        <div className="CellContentStatus">
            {columnValue && <p>{columnValue.value}</p>}
        </div>
    )
}