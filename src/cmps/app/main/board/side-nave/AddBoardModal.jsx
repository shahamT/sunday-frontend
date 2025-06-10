// === Libs
import { useState } from "react"
import { boardService } from "../../../../../services/board"
import { addBoard } from "../../../../../store/actions/board.actions"
import { useNavigate } from "react-router-dom"
import { showErrorMsg } from "../../../../../services/base/event-bus.service"
import { closeGlobalModal } from "../../../../../store/actions/app.actions"
import { useControlledInput } from "../../../../../hooks/useControlledInput"
import { useSelector } from "react-redux"
import { AiBoardGenLoader } from "./AiBoardGenLoader"
// import { generateAIBoard } from "../../../../../services/board/aiBoard.service"
// === Services


// ====== Component ======
// =======================

export function AddBoardModal({ setAddBoardModalState }) {

  // === Consts
  const navigate = useNavigate()
  const [isAi, setAi] = useState(setAddBoardModalState)
  const [isLoading, setIsLoading] = useState(false)

  const user = useSelector(storeState => storeState.userModule.loggedinUser)
  const [boardName, handleBoardNameChange, resetBoardName, setBoardName] = useControlledInput('')
  const [userPrompt, handleUserPromptChange, resetUserPrompt, setUserPrompt] = useControlledInput('')

  function getRegularBoard() {
    const board = boardService.getEmptyBoard()
    board.name = boardName
    return board
  }

  // async function onSubmitFake(ev) {
  //   setIsLoading(true)
  //   ev.preventDefault()

  //   const boardToCreate = isAi ? getBoardAI() : getRegularBoard()
  //   boardToCreate.name = boardName
  //   const delay = isAi ? 2500 : 0

  //   try {
  //     const savedBoard = await addBoard(boardToCreate)
  //     setTimeout(async () => {
  //       closeGlobalModal()
  //       navigate(`/app/board/${savedBoard._id}`)
  //     }, delay)
  //   } catch (err) {
  //     console.error('Save failed')
  //     showErrorMsg('Save failed')
  //   } finally {
  //     setTimeout(async () => {
  //       setIsLoading(false)
  //     }, delay)
  //   }

  // }

  async function onSubmit(ev) {
    ev.preventDefault()
    if (!boardName?.trim()) {
      showErrorMsg('Cannot create a board without a name');
      return
    }
    setIsLoading(true)

    try {
      const boardToCreate = isAi
        ? await boardService.getAiBoard(userPrompt, boardName, user)
        : getRegularBoard(user, boardName)

      const savedBoard = await addBoard(boardToCreate)

      closeGlobalModal()
      navigate(`/app/board/${savedBoard._id}`)
    }
    catch (err) {
      console.error(err)
      showErrorMsg('Somthing went wrong')
    }
    finally {
      setIsLoading(false)
    }

  }


if(isLoading && isAi) return(
  <section className="ai-loader">
    <AiBoardGenLoader/>
  </section>
)


  return (
    <section className="add-board-modal">
      <button className="close-btn clickable clear size-32 i-Close" onClick={closeGlobalModal} />
      <h1 className="title-add-modal">Create Board</h1>

      <form>

        <div className="input-group">
          <div className="title-wraper">
            <label className="input-title">Board name</label>
          </div>
          <input
            type="text"
            name="name"
            value={boardName || ''}
            autoFocus
            onChange={handleBoardNameChange}
          />
        </div>



        {isAi && (
          <div className="input-group">
            <div className="title-wraper">
              <label className="input-title animate__animated animate__fadeIn">
                Describe your board...
              </label>
              <div className="clickable clear size-32 icon-start i-DropdownChevronLeft"
                onClick={() => setAi(false)}>
                back to standard mode
              </div>
            </div>
            <textarea
              className="ai-textarea animate__animated animate__fadeIn"
              name="aiBoardPrompt"
              placeholder={`Describe the board you need. For example:\n'Plan a marketing campaign for a new product'`}
              value={userPrompt || ''}
              rows={4}
              onChange={handleUserPromptChange}
            />
          </div>
        )}
      </form>

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

    </section>
  )
}