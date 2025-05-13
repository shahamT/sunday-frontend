// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function StatusPicker({ onCloseModal, setStatus,defaultStatus }) {
   
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="status-picker-container">
        <section className='status-picker-items'>
            {defaultStatus.map(status => (
                <div
                    key={status.id}
                    className={`status-picker ${status.color}-bg`}
                    onClick={() => {
                        setStatus(status)
                        onCloseModal()
                    }}
                >
                    {status.name}
                </div>
            ))}
            <div className="default-status" onClick={() => {
                setStatus(null)
                onCloseModal()
            }}/>
            
        </section>
            <div className="divider1" />
            <div className="edit-btn clickable icon-start clear i-Edit size-32">Edit Labels</div>
        </section>
    )
}