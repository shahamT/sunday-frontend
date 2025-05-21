// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function K_ContentDate({ column, value }) {
    // === Consts
    const formattedValue = formatTimestamp(value)

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

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_ContentDate">
            <button className="content date clickable clear size-24 icon-start i-Calendar">{formattedValue}</button>
        </section>
    )
}