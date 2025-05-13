// === Libs

// === Services

// === Actions
import { updateBoard } from '../../../../store/actions/board.actions.js'

// === Hooks / React
import { EditableText } from '../../../../cmps/reusables/EditableText/EditableText.jsx'
import { useControlledInput } from '../../../../hooks/useControlledInput.js'
import { useEffect } from "react"

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function BoardHeader({ board }) {
    // === Consts
    const [value, handleChange, reset, set] = useControlledInput(null)

    // === Effects
    useEffect(() => {
        set(board?.name)
    }, [board])

    // === Functions
        function onSetName() {
            if (value === '') {
                showErrorMsg(`Board name can't be empty`)
                set(boardName)
                return
            }
    
            try {
                updateBoard({...board, name: value})
            }
            catch (err) {
                showErrorMsg(`Somthing went wrong`)
            }
        }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="BoardHeader">
            <EditableText
                value={value}
                full={false}
                size="title"
                handleChange={handleChange}
                onBlur={onSetName}
                onPressEnter={onSetName}
            />
            <p>hello</p>
        </section>
    )
}