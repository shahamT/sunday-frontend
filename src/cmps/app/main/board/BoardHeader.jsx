// === Libs

// === Services

// === Actions
import { updateBoard } from '../../../../store/actions/board.actions.js'

// === Hooks / React
import { EditableText } from '../../../../cmps/reusables/EditableText/EditableText.jsx'
import { useControlledInput } from '../../../../hooks/useControlledInput.js'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function BoardHeader({ isSelected, select }) {
    // === Consts
    const board = useSelector(storeState => storeState.boardModule.board)
    const [value, handleChange, reset, set] = useControlledInput(undefined)

    // === Effects
    useEffect(() => {
        set(board?.name)
    }, [board])

    // === Functions
    function onSetName() {
        if (value === '') {
            showErrorMsg(`Board name can't be empty`)
            set(board?.name)
            return
        }

        try {
            updateBoard({ ...board, name: value })
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="BoardHeader">
            <div className='main-section'>
                <div className="title-wraper">
                    <EditableText
                        value={value}
                        size="title"
                        handleChange={handleChange}
                        onBlur={onSetName}
                        onPressEnter={onSetName}
                    />
                </div>
                <div className="board-title-btn clickable clear icon-btn size-32 i-Update"></div>
            </div>

            <div className="tab-bar">
                <div key="main-table tab" className={`tab ${isSelected('main-table') ? 'tab-underline' : ''}`} onClick={() => select("main-table")}>
                    <div className="tab-btn clickable clear size-32 select">Main table</div>
                </div>
                <div key="kanban" className={`tab ${isSelected('kanban') ? 'tab-underline' : ''}`} onClick={() => select("kanban")}>
                    <div className="tab-btn clickable clear size-32 select">Kanban</div>
                </div>
            </div>
        </section>
    )
}

