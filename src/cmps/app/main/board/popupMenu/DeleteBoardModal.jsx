// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function DeleteBoardModal({ onRemoveBoard, closeGlobalModal, id }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="delete-board-modal">
            <button className="close-btn clickable clear size-32 i-Close" onClick={() => closeGlobalModal()} />
            <h1 className="title-delete-modal">Are you sure you wish to <br/>delete this board?</h1>
            <div className="btns-container">
                <button className="cancel-btn clickable clear size-40" onClick={() => closeGlobalModal()}>Cancel</button>
                <button className="delete-btn clickable filled negative size-40" onClick={() => {
                    onRemoveBoard(id)
                }}>Delete</button>
            </div>
        </section>
    )
}