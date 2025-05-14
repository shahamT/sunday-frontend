// === Libs

import { getRandomIntInclusive } from '../../../../../services/base/util.service.js'


// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ColorPicker({ onCloseModal, setLableColor, lableColor }) {
    const colors = [
        'color-1',
        'color-2',
        'color-3',
        'color-4',
        'color-5',
        'color-6',
        'color-7',
        'color-8',
        'color-9',
        'color-10',
        'color-11',
        'color-12',
        'color-13',
        'color-14',
        'color-15',
        'color-16'
    ]

    console.log(colors)
    // === Consts

    // === Effects

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="ComponentName">
            <h1>ComponentName</h1>
            {colors.map(color => (
                <div
                    key={color}
                    className={`circle color-picker-item ${color}-bg`}
                    onClick={() => {
                        setLableColor(color)
                        onCloseModal()
                    }}
                />
            ))}

        </section>
    )
}