// === Libs

// === Services

// === Actions
import { loadUsers } from "../../../../../store/actions/user.actions"

// === Hooks / React
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux"

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function PersonsPicker({ onCloseModal, currSelectedPersons, setPersons }) {
    // === Consts
    const users = useSelector(storeState => storeState.userModule.users)
    const boardAccountId = useSelector(storeState => storeState.boardModule.board.account._id)
    const [selectedPersons, setSelectedPersons] = useState(currSelectedPersons || [])

    // === Effects
    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        setPersons(selectedPersons)
    }, [selectedPersons])


    // === Functions
    function onSelectPerson(user) {
        setSelectedPersons(prevSelectedPersons => [...prevSelectedPersons, user])
        onCloseModal()
    }

    function onRemovePerson(personId) {
        setSelectedPersons(prevSelectedPersons => {
            return prevSelectedPersons.filter(person => person._id !== personId)
        })
    }

    if (!users || !boardAccountId) return <div>Loading...</div>
    return (
        <section className="PersonsPicker">
            <div className="selected-persons">
                {selectedPersons?.map(person => (
                    <div key={person._id} className="selected-person">
                        <img src={person.profileImg} alt="https://cdn1.monday.com/dapulse_default_photo.png" />
                        <section>{person.firstName} {person.lastName}</section>
                        <button className="remove-person-btn icon-btn size-24 i-CloseMedium" onClick={() => onRemovePerson(person._id)}></button>
                    </div>
                ))}
            </div>
            {selectedPersons?.length && <div className="divider"></div>}
            {users.map(user => {
                if (user.account === boardAccountId && !selectedPersons.some(person => person._id === user._id)) {
                    return (
                        <button key={user._id} className="person-select-btn clickable clear size-40 select" onClick={() => onSelectPerson(user)}>
                            <img src={user.profileImg} alt="https://cdn1.monday.com/dapulse_default_photo.png" />
                            <span>{user.firstName} {user.lastName}</span>
                        </button>
                    )
                }
            })}
        </section>
    )
}