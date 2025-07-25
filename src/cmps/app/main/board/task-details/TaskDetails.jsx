// === Libs

// === Services
import { userService } from "../../../../../services/user"
import { showErrorMsg } from "../../../../../services/base/event-bus.service"

// === Actions
import { removeColumnValue, setColumnValue } from "../../../../../store/actions/board.actions.js"
import { loadUsers } from "../../../../../store/actions/user.actions"

// === Hooks / React
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useControlledInput } from '../../../../../hooks/useControlledInput.js'
import { useSelected } from "../../../../../hooks/useSelected"

// === Imgs

// === Child Components
import { PersonsPreview } from "../table-view/T_CellContent/PersonsPreview"
import { EditableText } from '../../../../reusables/EditableText/EditableText.jsx'
import { PopUpMenu } from "../../../../reusables/PopUpMenu/PopUpMenu"
import { TaskMenu } from "../popupMenu/TaskMenu"
import { TaskDetailsUpdates } from "./TaskDetailsUpdates"
import { TaskDetailsActivityLog } from "./TaskDetailsActivityLog"
import { PersonsPicker } from "../value-setter/PersonsPicker"

// ====== Component ======
// =======================

export function TaskDetails() {

    // === Consts
    const navigate = useNavigate()
    const { boardId, taskId } = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)
    const panel = useSelector(storeState => storeState.boardModule.isTaskPanelOpen)
    const { selected, isSelected, select } = useSelected('updates')

    const [columns, setColumns] = useState(null)
    const [personsColumn, setPersonsColumn] = useState(null)
    const [task, setTask] = useState(null)
    const [groupId, setGroupId] = useState(null)
    const [selectedPersons, setSelectedPersons] = useState([])
    const [isOwnerSelected, setIsOwnerSelected] = useState(false)
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
        }
    }, [board, taskId])

    useEffect(() => {
        set(task?.columnValues[0]?.value)
    }, [task])

    useEffect(() => {
        if (!task || !columns) return;

        const peopleColId = columns.find(column => column.type.variant === 'people')?.id
        if (!peopleColId) return
        setPersonsColumn(peopleColId)

        const peopleColValue = task.columnValues.find(cv => cv.colId === peopleColId)
        let persons = Array.isArray(peopleColValue?.value) ? [...peopleColValue.value] : [];

        let ownerId = task.createdBy

        const enrich = async () => {
            let owner = persons.find(person => person._id === ownerId);
            if (owner) {
                setIsOwnerSelected(true)

            } else owner = await userService.getById(ownerId)
            persons = [owner, ...persons.filter(p => p._id !== owner._id)]
            setSelectedPersons(persons)
        }

        enrich()
    }, [task, columns])

    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        return () => {
            select('updates')}
    }, [panel])

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
            setColumnValue(taskId, task?.columnValues[0]?.colId, value, task?.columnValues[0]?.value)
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

    function setPersons(PersonsArray) {
        try {
            setColumnValue(taskId, personsColumn, PersonsArray, selectedPersons)
            if (PersonsArray.length === 0) onClearPersons()
        } catch (err) {
            showErrorMsg(`Something went wrong`);
        }
    }

    function onClearPersons() {
        try {
            removeColumnValue(taskId, personsColumn, selectedPersons);
        } catch (err) {
            showErrorMsg(`Something went wrong`);
        }
    }

    if (!task || !board) return 
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
                    <div className="in-task-persons" style={{ paddingInlineEnd: `${12 + 7 * (selectedPersons.length - 1)}px` }}><div>
                            <PopUpMenu
                                stretchTrigger={true}
                                gap={4}
                                noArrow={false}
                                position="bottom"
                                renderContent={({ onCloseModal }) => (
                                    <PersonsPicker
                                        onCloseModal={onCloseModal}
                                        currSelectedPersons={isOwnerSelected ? selectedPersons : selectedPersons.slice(1)}
                                        setPersons={setPersons}
                                    />
                                )}>
                                <button style={{ marginInlineEnd: `${selectedPersons.length === 1 ? '-7px' : '-2px'}` }} className="add-memeber-btn clickable filled icon-btn size-24 i-AddSmall"></button>
                            </PopUpMenu>
                        </div>
                        <PersonsPreview selectedPersons={selectedPersons} amount={selectedPersons.length} />
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
                    <div key="activity-log" className={isSelected('activity-log') ? 'tab-underline' : ''} onClick={() => select("activity-log")}>
                        <div className="tab-btn clickable clear size-32 select">Activity Log</div>
                    </div>
                </div>
            </section>

            <section className="task-details-tab-content slim-scroll">
                {isSelected('updates') && <TaskDetailsUpdates boardId={boardId} groupId={groupId} taskId={taskId} task={task} />}
                {isSelected('activity-log') && <TaskDetailsActivityLog task={task} board={board} />}
            </section>
        </section>
    )
}