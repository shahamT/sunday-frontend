import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import en from '@emoji-mart/data/locales/en.json'


// === Style

// === Services

// === Actions

// === React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function EmojiPicker({ /* prop1, prop2 */ }) {
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <div style={{ width: '320px' }}>
            <Picker
                data={data}
                locale={en}

                previewPosition="none"
                searchPosition="none"
                skinTonePosition="none"
            />
        </div>
    )
}