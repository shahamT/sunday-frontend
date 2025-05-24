// === Libs

// === Services

// === Actions

// === Hooks / React
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { EditableText } from '../../../../reusables/EditableText/EditableText.jsx'
import { useControlledInput } from '../../../../../hooks/useControlledInput.js'
import { showErrorMsg } from "../../../../../services/base/event-bus.service"
import { setColumnValue } from "../../../../../store/actions/board.actions"

// === Imgs

// === Child Components
import { K_ContentFile } from "./K_ContentFile"
import { K_ContentPeople } from "./K_ContentPeople"
import { K_ContentPreview } from "./K_ContentPreview"

// ====== Component ======
// =======================

export function K_TaskPreview({ task }) {
    // === Consts
    const board = useSelector(storeState => storeState.boardModule.board)
    const [peopleCol, setPeopleCol] = useState(null)
    const [fileCol, setFileCol] = useState(null)
    const [value, handleChange, reset, set] = useControlledInput(task.columnValues[0].value)
    

    // === Effects
    useEffect(() => {
        if(!board) return
        const peopleId = board.columns.find(col => col.type?.variant === 'people')?.id
        const fileId = board.columns.find(col => col.type?.variant === 'file')?.id
        const people = task.columnValues.find(cv => cv.colId === peopleId)
        const file = task.columnValues.find(cv => cv.colId === fileId)
        setPeopleCol(people)
        setFileCol(file)

    },[board])
    // === Functions

    function onSetName() {
        if (!value.trim()) {
            showErrorMsg(`Task name can't be empty`)
            set(task?.columnValues[0]?.value || '')
            return
        }

        try {
            setColumnValue(task.id, task?.columnValues[0]?.colId, value, task?.columnValues[0]?.value)
            //set task?
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_TaskPreview">

            <div className="task-name">
                <EditableText
                    value={value}
                    full={true}
                    size="small"
                    handleChange={handleChange}
                    onBlur={onSetName}
                    onPressEnter={onSetName}
                />    
            </div>

            <div className="divider" />
            
            <div className="CVs">
                {task.columnValues.map(cv => {
                    return <K_ContentPreview key={cv.colId} colId={cv.colId} value={cv.value} taskId={task.id}/>
                })}
            </div>

            {(peopleCol || fileCol) &&
            <>
                <div className="divider" />

                <div className="special-content">
                    {peopleCol &&
                    <>
                         <K_ContentPeople column={peopleCol.colId} value={peopleCol.value} taskId={task.id}/>
                        {/* {task.columnValues.map(cv => {
                            if(cv.colId === peopleCol.id) {
                                return <K_ContentPeople key={cv.colId} colId={cv.colId} value={cv.value}/>
                            }
                        })} */}
                    </>
                    }
                    {fileCol &&
                    <>
                        <K_ContentFile column={fileCol.colId} value={fileCol.value}/>
                    {/* {task.columnValues.map(cv => {
                        if(cv.colId === fileCol.id) {
                                return <K_ContentFile key={cv.colId} colId={cv.colId} value={cv.value}/>
                            }
                        })} */}
                    </>
                    }
                </div>
            </>
            }

        </section>
    )
}