// === Libs

import { getRandomIntInclusive } from '../../../../../services/base/util.service.js'


// === Services

// === Actions

// === Hooks / React

import { boardService } from '../../../../../services/board/board.service.local.js';
// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ColorPicker({ onCloseModal, setColor, selectedColor, variant = 'full' }) {
    const fullColors = boardService.getColors()

    const limitColors = [
        'done-green',
        'bright-green',
        'saladish',
        'egg_yolk',
        'working_orange',
        'purple',
        'dark-blue',
        'bright-blue',
        'sky',
        'stuck-red',
        'dark-red',
        'lipstick',
        'sofia_pink',
        'dark-orange',
        'peach',
        'pecan',
        'american_gray',
        'blackish'
    ]


    const colors = (variant === 'full') ? fullColors : limitColors
    const shape =  (variant === 'full') ? 'square ' : 'circle'
    // === Consts


    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="color-picker-container">
            {colors.map(color => (color === selectedColor ? null :
                <div
                    key={color}
                    className={`${shape} color-picker-item ${color}`}
                    onClick={() => {
                        // setShape(shape)
                        setColor(color)
                        onCloseModal()
                    }}
                />
            ))}

        </section>
    )
}