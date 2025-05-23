// === Libs

// === Services

// === Actions

// === Hooks / React
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

// === Imgs

// === Child Components
import { PersonsPreview } from "../table-view/T_CellContent/PersonsPreview"

// ====== Component ======
// =======================

export function K_ContentPeople({ column, value }) {
    console.log(value)
    // === Consts
    const users = useSelector(storeState => storeState.userModule.users)
    const [personsArray, setPersonsArray] = useState([])
    
    // === Effects
    useEffect(() => {
        if(!users) return
        const persons = users.filter(user => {
            return value.some(v => v._id === user._id)
        })
        setPersonsArray(persons)
    },[users])

    // === Functions

    // if (!data) return <div>Loading...</div>
    return (
        <section className="K_ContentPeople">
            <div className="people" style={{ paddingInlineStart: personsArray.length === 1 ? '0' : '7px'}}>
                <PersonsPreview selectedPersons={personsArray} amount={1} />
            </div>
        </section>
    )
}