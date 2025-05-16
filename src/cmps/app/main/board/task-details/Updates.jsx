// === Libs

import { useSelector } from "react-redux"

// === Services
import { getFormattedTime } from "../../../../../services/base/util.service"

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function Updates({ task }) {
    // === Consts
    const users = useSelector(storeState => storeState.userModule.users)

    // === Effects

    // === Functions

    if (!users) return 
    return (
        <section className="Updates">
            {task.updates.map(update => {
            const user = users.find(user => user._id === update.createdBy)
            return (
                <div key={update.id} className="update">
                    <div className="update-header">
                        {user && (
                            <>
                            <img src={user.profileImg} alt="" />
                            <span className="name">{user.firstName} {user.lastName}</span>
                            </>
                        )}
                        <span>{getFormattedTime(update.createdAt)}</span>
                    </div>
                    <p>{update.txt}</p>
                </div>
            )
            })}
        </section>
    )
}