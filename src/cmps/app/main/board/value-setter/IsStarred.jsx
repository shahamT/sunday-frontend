// === Libs

import { useState } from "react"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function IsStarred({ board }) {
    const [isStarred, setIsStareed] = useState(board.isStarred)

    // === Consts

    // === Effects

    // === Functions
    function handleChange({ target }) {
        const updatedBoard = {
            ...board,
            isStarred: !board.isStarred

        }
        // if (!data) return <div>Loading...</div>
        return (
            <section className="ComponentName">
                <div
                    className={`star-toggle clickable size-32 icon-start clear select full-width left-aligned i-Favorite ${isStarred ? 'starred' : ''}`}
                    onClick={handleChange} >
                    {isStarred ? 'Remove from Favorites' : 'Add to Favorites'}
                </div>
            </section>
        )
    }
}