// === Libs

import { K_ContentFile } from "./K_ContentFile"
import { K_ContentPeople } from "./K_ContentPeople"
import { K_ContentPreview } from "./K_ContentPreview"

// === Services

// === Actions

// === Hooks / React
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function K_TaskPreview({ task }) {
    // === Consts
    const board = useSelector(storeState => storeState.boardModule.board)
    const [peopleCol, setPeopleCol] = useState(null)
    const [fileCol, setFileCol] = useState(null)

    // === Effects
    useEffect(() => {
        if(!board) return
        const people = board.columns.find(col => col.type?.variant === 'people')
        const file = board.columns.find(col => col.type?.variant === 'file')
        setPeopleCol(people)
        setFileCol(file)

    },[board])
    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_TaskPreview">

            <div>{task.columnValues[0].value}</div> {/** needs to be editable text */}
            <div className="CVs">
                {task.columnValues.map(cv => {
                    return <K_ContentPreview key={cv.colId} colId={cv.colId} value={cv.value}/>
                })}
            </div>

            <div className="special-content">
                {peopleCol &&
                <>
                    {task.columnValues.map(cv => {
                        if(cv.colId === peopleCol.id) {
                            return <K_ContentPeople key={cv.colId} colId={cv.colId} value={cv.value}/>
                        }
                    })}
                </>
                }
                {fileCol &&
                <>
                {task.columnValues.map(cv => {
                    if(cv.colId === fileCol.id) {
                            return <K_ContentFile key={cv.colId} colId={cv.colId} value={cv.value}/>
                        }
                    })}
                </>
                }
            </div>

        </section>
    )
}