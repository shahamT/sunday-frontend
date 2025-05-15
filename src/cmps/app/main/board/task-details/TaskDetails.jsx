// === Libs

// === Services
import { userService } from "../../../../../services/user"
import { showErrorMsg } from "../../../../../services/base/event-bus.service"
import { setColumnValue } from "../../../../../store/actions/board.actions.js"

// === Actions

// === Hooks / React
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { EditableText } from '../../../../reusables/EditableText/EditableText.jsx'
import { useControlledInput } from '../../../../../hooks/useControlledInput.js'

// === Imgs

// === Child Components
import { PersonsPreview } from "../table-view/T_CellContent/PersonsPreview"
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { TaskMenu } from "../popupMenu/TaskMenu"
import { useSelected } from "../../../../../hooks/useSelected"
import { TaskDetailsUpdates } from "./TaskDetailsUpdates"
import { TaskDetailsFiles } from "./TaskDetailsFiles"
import { TaskDetailsActivityLog } from "./TaskDetailsActivityLog"

// ====== Component ======
// =======================

export function TaskDetails() {
    // === Consts
    const navigate = useNavigate()
    const {boardId, taskId} = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const { selected, isSelected, select } = useSelected('updates')
    
    const [columns, setColumns] = useState(null)
    const [task, setTask] = useState(null)
    const [groupId, setGroupId] = useState(null)
    const [selectedPersons, setSelectedPersons] = useState([])
    const [value, handleChange, reset, set] = useControlledInput('')
    
    // === Effects
    useEffect(() => {
        const foundTask = getTaskById(taskId)
        if (foundTask) {
            setTask(foundTask)
            set(foundTask.columnValues[0]?.value || '')
        }

        if (board) {
            setColumns(board.columns)
            // setSelectedPersons(getSelectedPersons())
        }
    }, [board, taskId])

    useEffect(() => {
        set(task?.columnValues[0]?.value)
    }, [task])

    useEffect(() => {
        if (!task || !columns) return;

        const peopleColId = columns.find(column => column.type.variant === 'people')?.id
        if(!peopleColId) return

        const peopleColValue = task.columnValues.find(cv => cv.colId === peopleColId)
        let persons = Array.isArray(peopleColValue?.value) ? [...peopleColValue.value] : [];

        let ownerId = task.createdBy

        const enrich = async () => {
            let owner = persons.find(person => person._id === ownerId);
            if (!owner) {
                owner = await userService.getById(ownerId);
            }
            persons = [owner, ...persons.filter(p => p._id !== owner._id)]
            setSelectedPersons(persons)
        }

        enrich()


}, [task, columns])

    // === Functions
    function onCloseTaskDetails() {
        navigate(`/app/board/${boardId}`)
    }

    function onSetName() {
        if (!value.trim()) {
            showErrorMsg(`Task name can't be empty`)
            set(task?.columnValues[0]?.value || '')
            return
        }

        try {
            setColumnValue(taskId, task?.columnValues[0]?.colId, value)
            //set task?
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    function getTaskById(taskId) {
        
        for (const group of board?.groups || []) {
            for (const task of group.tasks) {
                if (task.id === taskId) {
                    setGroupId(group.id)
                    return task
                }
            }
        }
        return null
    }

    // function getSelectedPersons() {
    //     const peopleColId = columns.find(column => column.type.variant === 'people')?.id
    //     const colValue = task.columnValues.find(cv => cv.colId === peopleColId)
    //     setSelectedPersons(colValue?.value || [])
    // }

    if (!task || !board) return <div>Loading...</div>
    return (
        <section className="TaskDetails">
            <section className="task-details-header">
                    <button className="exit-btn clickable clear icon-btn size-24 i-Close" onClick={onCloseTaskDetails}></button>
                <section className="task-details-title">
                    <EditableText
                        value={value}
                        full={true}
                        size="title"
                        handleChange={handleChange}
                        onBlur={onSetName}
                        onPressEnter={onSetName}
                    />
                    <div className="in-task-persons" style={{ paddingInlineEnd: `${12 + 7 * (selectedPersons.length - 1)}px` }}>
                    {/* <div className="in-task-persons" style={{ paddingInlineEnd: selectedPersons.length === 1
                        ? '5px'
                        : `${19 + 7 * (selectedPersons.length - 1)}px`
                    }}> */}
                        <button style={{marginInlineEnd: `${selectedPersons.length === 1 ? '-7px' : '-2px'}`}} className="add-memeber-btn clickable filled icon-btn size-24 i-AddSmall"></button>
                        <PersonsPreview selectedPersons={selectedPersons} amount={selectedPersons.length}/>
                    </div>
                    <div className="options-menu-wraper">
                        <PopUpMenu
                            position="bottom-end"
                            renderContent={({ onCloseModal }) => (
                                <TaskMenu
                                    onCloseModal={onCloseModal}
                                    taskId={task.id}
                                    groupId={groupId}
                                />
                            )}
                        >
                            <div className="task-menu-btn clickable clear icon-btn size-24 i-Menu"></div>
                        </PopUpMenu>   
                    </div>
                </section>
                    <div className="tab-bar">         
                        <div key="updates" className={isSelected('updates') ? 'tab-underline' : ''} onClick={() => select("updates")}>
                            <div className="tab-btn clickable clear size-32 select icon-start i-Home">Updates</div>
                        </div>
                        <div key="files" className={isSelected('files') ? 'tab-underline' : ''} onClick={() => select("files")}>
                            <div className="tab-btn clickable clear size-32 select">Files</div>
                        </div>
                        <div key="activity-log" className={isSelected('activity-log') ? 'tab-underline' : ''} onClick={() => select("activity-log")}>
                            <div className="tab-btn clickable clear size-32 select">Activity Log</div>
                        </div>
                    </div> 
            </section>

            {isSelected('updates') && <TaskDetailsUpdates />}
            {isSelected('files') && <TaskDetailsFiles />}
            {isSelected('activity-log') && <TaskDetailsActivityLog />}
        </section>
    )
}