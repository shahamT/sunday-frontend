// === Libs

// === Services

// === Actions
import { updateBoard } from '../../../../store/actions/board.actions.js'

// === Hooks / React
import { useControlledInput } from '../../../../hooks/useControlledInput.js'
import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';

// === Imgs

// === Child Components
import { EditableText } from '../../../../cmps/reusables/EditableText/EditableText.jsx'

// ====== Component ======
// =======================

export function BoardHeader() {
    // === Consts
    const board = useSelector(storeState => storeState.boardModule.board)
    const [value, handleChange, reset, set] = useControlledInput(undefined)
    const location = useLocation()
    const isKanbanRoute = location.pathname.endsWith('/kanban')
    const mobileView = window.matchMedia("(max-width: 600px)");

    const navigate = useNavigate()

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

        if(value !== board?.name) {
            }
            try {
                updateBoard({ ...board, name: value })
            }
            catch (err) {
                showErrorMsg(`Somthing went wrong`)
            }
    }

    return (
        <section className="BoardHeader">
            <div className='main-section'>
                <div className="title-wraper">
                    <EditableText
                        value={value}
                        size= {mobileView.matches ?"g-title" :"title"}
                        handleChange={handleChange}
                        onBlur={onSetName}
                        onPressEnter={onSetName}
                    />
                </div>
                <div className="board-title-btn clickable clear icon-btn size-32 i-Update"></div>
            </div>

            <div className="tab-bar">
                <div key="main-table tab" className={`tab ${!isKanbanRoute ? 'tab-underline' : ''}`} onClick={() => navigate(`/app/board/${board._id}`)}>
                    <div className="tab-btn clickable clear size-32 select">Main table</div>
                </div>
                <div key="kanban" className={`tab ${isKanbanRoute ? 'tab-underline' : ''}`} onClick={() => navigate(`/app/board/${board._id}/kanban`)}>
                    <div className="tab-btn clickable clear size-32 select">Kanban</div>
                </div>
            </div>
        </section>
    )
}

