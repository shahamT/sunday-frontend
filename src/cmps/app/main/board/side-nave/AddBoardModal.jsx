// === Libs
import { useEffect, useState } from "react"
import { boardService } from "../../../../../services/board"
import { addBoard } from "../../../../../store/actions/board.actions"
import { useNavigate } from "react-router-dom"
import { showErrorMsg } from "../../../../../services/base/event-bus.service"
import { closeGlobalModal } from "../../../../../store/actions/app.actions"
import { getBoardAI } from '../../../../../services/base/getBoardAI'
// === Services


// ====== Component ======
// =======================

export function AddBoardModal({ setAddBoardModalState }) {

  // === Consts
  const [newBoard, setNewBoard] = useState('')
  const navigate = useNavigate()
  const [isAi, setAi] = useState(setAddBoardModalState)
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

  async function onSubmit(ev) {
    setIsLoading(true)
    ev.preventDefault()
    const boardToCreate = isAi ? getBoardAI() : newBoard
    const delay = isAi ? 2500 : 0

    try {
      const savedBoard = await addBoard(boardToCreate)
      setTimeout(async () => {
        closeGlobalModal()
        navigate(`/app/board/${savedBoard._id}`)
      }, delay)
    } catch (err) {
      console.error('Save failed')
      showErrorMsg('Save failed')
    } finally {
      setTimeout(async () => {
        setIsLoading(false)
      }, delay)
    }

  }

  const { name } = newBoard

  return (
    <section className="add-board-modal">
      <button className="close-btn clickable clear size-32 i-Close" onClick={closeGlobalModal} />
      <h1 className="title-add-modal">Create Board</h1>

      <form onSubmit={onSubmit}>

        <div className="input-group">
          <div className="title-wraper">
            <label className="input-title">Board name</label>
          </div>
          <input
            type="text"
            name="name"
            value={name || ''}
            autoFocus
            onChange={hendleChange}
          />
        </div>



        {isAi && (
          <div className="input-group">
            <div className="title-wraper">
              <label className="input-title animate__animated animate__fadeIn">
                Talk with the AI...
              </label>
              <div className="clickable clear size-32 icon-start i-DropdownChevronLeft"
                onClick={() => setAi(false)}>
                back to regular mode
              </div>
            </div>
            <textarea
              className="ai-textarea animate__animated animate__fadeIn"
              name="aiBoardPrompt"
              placeholder={`Describe the board you need. For example:\n'Plan a marketing campaign for a new product'`}
              rows={4}
            />
          </div>
        )}

        {!isAi && (

          <button
            type="button"
            className="ai-btn clickable i-Robot icon-start clear size-48 full-width"
            onClick={() => setAi(true)}
          >
            Create board with AI
          </button>
        )}

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
              {isAi ? 'Create AI Board' : 'Create Board'}
            </div>
          </div>
        </section>
      </form>
    </section>
  )
}