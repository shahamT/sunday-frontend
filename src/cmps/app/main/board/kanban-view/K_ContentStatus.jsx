// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function K_ContentStatus({ column, value }) {

    // === Consts
    const label = column.type.labels.find(label => label.id === value)

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_ContentStatus">
            <div className={`status clickable size-24 ${label.color}-bg`} >{label.name}</div>
        </section>
    )
}