// === Libs

// === Services

// === Actions

// === Hooks / React
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function TaskDetails({ /* prop1, prop2 */ }) {
    // === Consts
    const navigate = useNavigate()
    const {boardId} = useParams()

    // === Effects

    // === Functions
    function onCloseTaskDetails() {
        navigate(`/app/board/${boardId}`)
    }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="TaskDetails">
            <p>TaskDetails</p>
            <button onClick={onCloseTaskDetails}>X</button>
        </section>
    )
}