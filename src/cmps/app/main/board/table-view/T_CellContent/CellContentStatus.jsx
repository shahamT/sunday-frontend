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

    // === Effects

    // === Functions

    const selectedLabel = column.type.labels.find(label => label.id === columnValue?.value);
    const labelName = selectedLabel?.name ?? '';
    const labelColor = selectedLabel?.color ?? '';

    return (
        <div className={`CellContentStatus cell-contnet centered ${labelColor}-bg`}>
            <div className="fold"></div>
            {columnValue && <p>{labelName}</p>}

        </div>
    )
}