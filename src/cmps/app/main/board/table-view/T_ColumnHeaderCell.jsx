// === Libs

import { EditableText } from "../../../../reusables/EditableText/EditableText";


// === Services

// === Actions

// === Hooks / React
import { useControlledInput } from "../../../../../hooks/useControlledInput";

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function T_ColumnHeaderCell({ column, groupId }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput('')

    // === Effects

    // === Functions
    function onUpdateColumnName() {
        if (value === '') {
            showErrorMsg(`Column name can't be empty`)
            set(column.name)
            return
        }
        const updatedColumn = { ...column, name: value };
        updateColumn(updatedColumn)
            .catch(showErrorMsg(`Somthing went wrong`));
    }


    const variant = column.type.variant
    return (
        <div
            className={`T_ColumnHeaderCell t-cell ${variant === 'item' ? 'no-divider sticky' : ''}`}
            style={{ width: column.width + 'px' }}
        >

            <div className="cell-contnet">
                {variant === 'item' &&
                    <label htmlFor={`g${groupId}`} className="checkbox-container">
                        <input type="checkbox" name="" id={`g${groupId}`} />
                    </label>
                }
                <EditableText
                    value={column.name}
                    emojiPicker={false}
                    centered={true}
                    size="small"
                    onBlur={onUpdateColumnName}
                    onPressEnter={onUpdateColumnName}
                />
            </div>
        </div>
    )
}