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

export function ColorPicker({ onCloseModal, setColor, selectedColor, variant = 'full', setIsPickingColor, setIsNewLabelOpen, relevantColors }) {
    
    const fullColors = boardService.getColors()
    const availableColors = fullColors.filter(
        color => color !== 'explosive' && !relevantColors?.includes(color)
      )

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


    const colors = (variant === 'full') ? availableColors : limitColors
    const shape = (variant === 'full') ? 'square ' : 'circle'
    // === Consts


    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="color-picker-container">
            {colors.map(color => (color === selectedColor ? null :
                <div
                    key={color}
                    className={`${shape} color-picker-item ${color}-bg`}
                    onMouseDown={(e) => {
                        setColor(color)
                        if (variant === 'full'){
                            e.stopPropagation()
                            onCloseModal()
                        } 
                    }
                    }
                    onClick={() => {
                        if (setIsNewLabelOpen) setIsNewLabelOpen(true)
                        if (setIsPickingColor) setIsPickingColor(false)
                        onCloseModal()
                    }}
                />
            ))}

        </section>
    )
}