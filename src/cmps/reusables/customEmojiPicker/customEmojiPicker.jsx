import './CustomEmojiPicker.scss'

// === Libs
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// === React


// ====== Component ======
// =======================

export function CustomEmojiPicker({ onSelect }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <div onMouseDown={(e) => e.preventDefault()}>
            <Picker
                data={data}
                theme="light"
                perLine={6}
                maxFrequentRows={2}
                emojiButtonSize={40}
                onEmojiSelect={(emoji) => {
                    if (onSelect) onSelect(emoji);
                }}
            />
        </div>
    )
}