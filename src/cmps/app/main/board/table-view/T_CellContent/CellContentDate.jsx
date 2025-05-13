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


    return (
        <div className={`CellContentDate cell-contnet centered`}>
            
            <div className="input-outline">
                
            </div>

            {columnValue &&
            <div className="date-label">{formatTimestamp(columnValue.value)}
            </div>}


             {!columnValue &&
             <div className="date-empty-state">
                <div className="plus-btn">
                     <div className="plus-icon i-AddSmall"/>
                </div>
                <div className="calendar-icon i-Calendar"/>
             </div>
             }

        </div>
    )
}