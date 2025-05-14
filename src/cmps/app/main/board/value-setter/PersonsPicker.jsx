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

export function PersonsPicker({ /* prop1, prop2 */ }) {
    // === Consts
    const users = useSelector(storeState => storeState.userModule.users)

    console.log(users)
    // === Effects
    useEffect(() => {
        loadUsers()
    }, [])
    // === Functions

    if (!users) return <div>Loading...</div>
    return (
        <section className="PersonsPicker">
            {users.map(user => (
                <button className="user-select-btn clickable clear size-40">
                    <img src={user.profileImg} alt="https://cdn1.monday.com/dapulse_default_photo.png" />
                    <span>{user.firstName} {user.lastName}</span>
                </button>
            ))}
        </section>
    )
}