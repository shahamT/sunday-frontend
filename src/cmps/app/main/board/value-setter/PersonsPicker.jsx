// === Libs

// === Services

// === Actions
import { loadUsers } from "../../../../../store/actions/user.actions"

// === Hooks / React
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useEffectUpdate } from "../../../../../hooks/useEffectUpdate"

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function PersonsPicker({ onCloseModal, currSelectedPersons, setPersons }) {
    // === Consts
    // === Effects
    const users = useSelector(storeState => storeState.userModule.users)
    const boardAccountId = useSelector(storeState => storeState.boardModule.board.account)
    const [selectedPersons, setSelectedPersons] = useState(currSelectedPersons || [])
    useEffect(() => {
        loadUsers()
    }, [])

    useEffectUpdate(() => {
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
                        <div className="profile-img-wrapper">
                            <img src={person.profileImg || `https://cdn1.monday.com/dapulse_default_photo.png`} alt="" />
                        </div>
                        <section>{person.firstName} {person.lastName}</section>
                        <button className="remove-person-btn icon-btn size-24 i-CloseMedium" onClick={() => onRemovePerson(person._id)}></button>
                    </div>
                ))}
            </div>
            {!!selectedPersons?.length && <div className="divider"></div>}
            <div className="persons-list">
            {users.map(user => {
                if (user.account === boardAccountId && !selectedPersons.some(person => person._id === user._id)) {
                    return (
                        <button key={user._id} className="person-select-btn clickable clear size-40 select" onClick={() => onSelectPerson(user)}>
                            <div className="profile-img-wrapper">
                                <img src={user.profileImg || `https://cdn1.monday.com/dapulse_default_photo.png`} alt="" />
                            </div>
                            <span>{user.firstName} {user.lastName}</span>
                        </button>
                    )
                }
            })}
            </div>
        </section>
    )
}