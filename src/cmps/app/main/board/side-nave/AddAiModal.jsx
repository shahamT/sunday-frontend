// === Libs
import { useEffect, useState } from "react"
import { boardService } from "../../../../../services/board"
import { addBoard } from "../../../../../store/actions/board.actions"
import { useNavigate } from "react-router-dom"
import { showErrorMsg } from "../../../../../services/base/event-bus.service"
import { updateUser } from "../../../../../store/actions/user.actions"
import { closeGlobalModal } from "../../../../../store/actions/app.actions"
import { getBoardAI } from '../../../../../services/base/getBoardAI'
// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function AddAiModal() {

    // === Consts
    const [newBoard, setNewBoard] = useState('')
    const navigate = useNavigate()
    const [isAi, setAi] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    // === Effects
    useEffect(() => {
        const board = boardService.getEmptyBoard()
        setNewBoard({ ...board, name: 'New Board' })
    }, [])

    // === Functions
    function hendleChange({ target }) {
        const field = target.name
        let value = target.value
        setNewBoard(prevNewBoard => ({ ...prevNewBoard, [field]: value }))
    }

    const aiBoard = getBoardAI()


    async function onSubmit(ev) {
        setIsLoading(true)
        ev.preventDefault()
        const boardToCreate = isAi ? aiBoard : newBoard
        setTimeout(async () => {
            try {
                const savedBoard = await addBoard(boardToCreate)
                updateUser(savedBoard._id)
                closeGlobalModal()
                navigate(`/app/board/${savedBoard._id}`)
            } catch (err) {
                console.error('Save failed')
                showErrorMsg('Save failed')
            } finally {
                setIsLoading(false)
            }
        }, 1000)
    }

    const { name } = newBoard

    return (
        <section className="add-board-modal">
            <button className="close-btn clickable clear size-32 i-Close" onClick={closeGlobalModal} />
            <form onSubmit={onSubmit}>
                <h1 className="title-add-modal">Create Board</h1>

                {!isAi ? (
                    <>
                        <p className="title">Board name</p>
                        <input
                            type="text"
                            name="name"
                            value={name || ''}
                            autoFocus
                            onChange={hendleChange}
                        />
                    </>
                ) : (
                    <>
                        <p className="title">Use AI to Create Board</p>
                        <textarea
                            className="ai-textarea"
                            name="aiBoardPrompt"
                            placeholder={`Describe the board you need. For example:\n'Plan a marketing campaign for a new product'`}
                            rows={4}
                        />
                    </>
                )}

                <section>
                    {isAi ? (
                        <button
                            type="button"
                            className="ai-btn clickable i-UserDomain icon-start clear size-48"
                            onClick={() => setAi(false)}
                        >
                            Create board by yourself
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="ai-btn clickable i-Robot icon-start clear size-48"
                            onClick={() => setAi(true)}
                        >
                            Create board with AI
                        </button>
                    )}
                </section>

                <p className="new-board-encourage">
                    Let’s get you started with a fresh new board!
                </p>

                <section className="closer">
                    <div className="divider" />
                    <div className="add-board-btns">
                        <div
                            className="cancel-btn clickable clear size-40"
                            onClick={(ev) => {
                                ev.stopPropagation()
                                closeGlobalModal()
                            }}
                        >
                            Cancel
                        </div>
                        <div
                            className={`create-btn clickable filled size-40 ${isLoading ? "loading" : ""}`}
                            disabled={isLoading}
                            onClick={onSubmit}
                        >
                            Create Board
                        </div>
                    </div>
                </section>
            </form>
        </section>
    )
}