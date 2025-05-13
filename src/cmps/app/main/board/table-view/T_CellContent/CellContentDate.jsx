// === Libs


// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function CellContentDate({ column, columnValue }) {
    // === Consts

    // === Effects

    // === Functions
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();

        const isSameYear = date.getFullYear() === now.getFullYear();

        const options = {
            month: 'short',
            day: 'numeric',
            ...(isSameYear ? {} : { year: 'numeric' }),
        };

        return date.toLocaleDateString('en-US', options);
    }

    const formattedDate = formatTimestamp(columnValue.value)
    return (
        <div className={`CellContentDate cell-contnet centered`}>
            {columnValue && <p>{formattedDate}</p>}

        </div>
    )
}