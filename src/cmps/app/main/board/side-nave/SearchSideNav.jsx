// === Libs

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function SearchSideNav({ setBoardFilterBy, boardFilterBy,setSearchOpen }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="search-side-nav">

            <span className="i-Search input-icon" />
            <input
                type="text"
                value={boardFilterBy}
                placeholder='Search in Main workspace'
                autoFocus
                onChange={(e) => setBoardFilterBy(e.target.value)}
                // onBlur={() => handleRename(board)}
                // onKeyDown={(e) => e.key === "Enter" && handleRename(board)}
                className="search-board-input"
            />

            <div
                className="close-btn clickable clear icon-btn size-24 i-CloseSmall"
                onClick={() => setSearchOpen(prev => !prev)}
            />


        </section>
    )
}