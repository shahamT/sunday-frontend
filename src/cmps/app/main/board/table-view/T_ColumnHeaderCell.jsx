// === Libs

import { EditableText } from "../../../../reusables/EditableText/EditableText";


// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function T_ColumnHeaderCell({ column ,groupId}) {
    // === Consts

    // === Effects

    // === Functions
    const variant = column.type.variant
    return (
        <div
            className={`T_ColumnHeaderCell t-cell ${variant === 'item' ? 'first' : ''}`}
            style={{ width: column.width + 'px' }}
        >

            <div className="cell-contnet">
                {variant === 'item' &&
                    <label htmlFor={`g${groupId}`} className="checkbox-container">
                        <input type="checkbox" name="" id={`g${groupId}`}/>
                    </label>
                }
                <EditableText
                    value={column.name}
                    emojiPicker={false}
                    centered={true}
                    size="small"
                />
            </div>
        </div>
    )
}