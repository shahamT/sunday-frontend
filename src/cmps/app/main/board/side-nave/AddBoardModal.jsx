// === Libs
import { useEffect, useState } from "react"
import { boardService } from "../../../../../services/board"
import { addBoard } from "../../../../../store/actions/board.actions"
import { useNavigate } from "react-router-dom"
import { showErrorMsg } from "../../../../../services/base/event-bus.service"
import { updateUser } from "../../../../../store/actions/user.actions"
import { closeGlobalModal } from "../../../../../store/actions/app.actions"
import { useSelector } from "react-redux"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function AddBoardModal() {

    // === Consts
    const [newBoard, setNewBoard] = useState('')
    const navigate = useNavigate()
    const [isAi, setAi] = useState(false)

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

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const userId = user._id

    const aiBoard = {
        "account": "acc-demo01",
        "createdAt": 1743498770,
        "createdBy": {
            "_id": userId
        },
        "pos": 0,
        "name": "Yard Renovation Planning",
        "isStarred": false,
        "members": [],
        "activities": [],
        "columns": [
            {
                "id": "col-status",
                "name": "Status",
                "createdAt": 1744621970,
                "createdBy": {
                    "_id": userId
                },
                "width": 160,
                "type": {
                    "variant": "status",
                    "labels": [
                        { "id": "lbl-1", "name": "Planned", "color": "blue" },
                        { "id": "lbl-2", "name": "In Progress", "color": "yellow" },
                        { "id": "lbl-3", "name": "Completed", "color": "green" }
                    ]
                }
            },
            {
                "id": "col-priority",
                "name": "Priority",
                "createdAt": 1744362770,
                "createdBy": {
                    "_id": userId
                },
                "width": 160,
                "type": {
                    "variant": "status",
                    "labels": [
                        { "id": "lbl-4", "name": "High", "color": "red" },
                        { "id": "lbl-5", "name": "Medium", "color": "orange" },
                        { "id": "lbl-6", "name": "Low", "color": "gray" }
                    ]
                }
            },
            {
                "id": "col-due",
                "name": "Due Date",
                "createdAt": 1743153170,
                "createdBy": {
                    "_id": userId
                },
                "width": 160,
                "type": { "variant": "date" }
            },
            {
                "id": "col-notes",
                "name": "Notes",
                "createdAt": 1743325970,
                "createdBy": {
                    "_id": userId
                },
                "width": 160,
                "type": { "variant": "text" }
            },
            {
                "id": "col-cost",
                "name": "Estimated Cost",
                "createdAt": 1744967570,
                "createdBy": {
                    "_id": userId
                },
                "width": 160,
                "type": { "variant": "number" }
            }
        ],
        "groups": [
            {
                "id": "grp-design",
                "name": "Planning",
                "color": "purple",
                "isCollapsed": false,
                "createdBy": userId,
                "createdAt": 1745745170,
                "tasks": [
                    {
                        "id": "tsk-1",
                        "createdAt": 1742893970,
                        "createdBy": userId,
                        "columnValues": [
                            { "colId": "col-status", "value": "lbl-1" },
                            { "colId": "col-priority", "value": "lbl-4" },
                            { "colId": "col-due", "value": 1747732370 },
                            { "colId": "col-notes", "value": "Finalize design layout with measurements." },
                            { "colId": "col-cost", "value": 500 }
                        ]
                    },
                    {
                        "id": "tsk-2",
                        "createdAt": 1742895000,
                        "createdBy": userId,
                        "columnValues": [
                            { "colId": "col-status", "value": "lbl-1" },
                            { "colId": "col-priority", "value": "lbl-5" },
                            { "colId": "col-due", "value": 1747832370 },
                            { "colId": "col-notes", "value": "Research and choose plants." },
                            { "colId": "col-cost", "value": 200 }
                        ]
                    }
                ]
            },
            {
                "id": "grp-execution",
                "name": "Execution",
                "color": "green",
                "isCollapsed": false,
                "createdBy": userId,
                "createdAt": 1745745180,
                "tasks": [
                    {
                        "id": "tsk-3",
                        "createdAt": 1742993970,
                        "createdBy": userId,
                        "columnValues": [
                            { "colId": "col-status", "value": "lbl-2" },
                            { "colId": "col-priority", "value": "lbl-4" },
                            { "colId": "col-due", "value": 1748032370 },
                            { "colId": "col-notes", "value": "Hire contractor for paving." },
                            { "colId": "col-cost", "value": 1200 }
                        ]
                    }
                ]
            }
        ]
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        const boardToCreate = isAi ? aiBoard : newBoard
        try {
            const savedBoard = await addBoard(boardToCreate)
            updateUser(savedBoard._id)
            closeGlobalModal()
            navigate(`/app/board/${savedBoard._id}`)
        }
        catch (err) {
            console.error('Save failed')
            showErrorMsg('Save failed')
        }
    }

    const { name } = newBoard
    return (
        <section className="add-board-modal">
            <button className="close-btn clickable clear size-32 i-Close" onClick={() => closeGlobalModal()} />
            <form onSubmit={onSubmit}>
                <h1 className="title-add-modal">Create Board</h1>

                {!isAi ? <>
                    <p className="title">Board name</p>
                    <input type="text" name="name" value={name || ''} autoFocus onChange={hendleChange}
                    />
                </>
               : <p className="title">Use AI to Create Board</p>
                }
                    {isAi &&
                        <textarea className="ai-textarea"
                            name="aiBoardPrompt"
                            // value={prompt}
                            // onChange={handleChange}
                            // onClick={getFakeAiBoard}
                            placeholder="Describe the board you need. For example: 

                <p className="title">Board name</p>
                <input type="text" name="name" value={name || ''} autoFocus onChange={hendleChange}
                />

                <section>
                    {!isAi &&
                        // ?
                        // <button type="button" className="ai-btn clickable i-UserDomain icon-start clear size-48" onClick={() => setAi(false)}> Create board by yourself</button>
                        // :
                        <button type="button" className="ai-btn clickable i-Robot icon-start clear size-48" onClick={() => setAi(true)}> Create board with ai</button>}
                </section>

                {isAi &&
                    <textarea className="ai-textarea"
                        name="aiBoardPrompt"
                        // value={prompt}
                        // onChange={handleChange}
                        // onClick={getFakeAiBoard}
                        placeholder="Describe the board you need. For example: 
                            'Plan a marketing campaign for a new product'"
                        rows={4}
                    />}

                <p className="new-board-encourage">Let’s get you started with a fresh new board!</p>
                <section className="closer">
                <div className="divider" />
                <div className="add-board-btns">
                    <div className="cancel-btn clickable clear size-40" onClick={(ev) => {
                        ev.stopPropagation()
                        closeGlobalModal()
                    }}>Cancel</div>
                    <div className="create-btn clickable filled size-40" onClick={onSubmit} >Create Board</div>
                </div>
               </section>
            </form>
        </section>
    )
}