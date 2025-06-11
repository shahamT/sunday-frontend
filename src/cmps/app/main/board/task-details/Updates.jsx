// === Libs

// === Services
import { getFormattedTime } from "../../../../../services/base/util.service"

// === Actions
import { removeTaskUpdate } from "../../../../../store/actions/board.actions"

// === Hooks / React
import { useSelector } from "react-redux"

// === Imgs

// === Child Components
import { TaskComment } from "./TaskComment"

// ====== Component ======
// =======================

export function Updates({ task, boardId, groupId, taskId }) {
    // === Consts
    const users = useSelector(storeState => storeState.userModule.users)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

    // === Effects

    // === Functions
    function onRemoveUpdate(updateId) {
        removeTaskUpdate(boardId, groupId, taskId, updateId)
    }

    if (!users) return 
    return (
        <section className="Updates">
            {task.updates.map(update => {
            const user = users.find(user => user._id === update.createdBy)
            return (
                <div key={update.id} className="update">
                    <div className="update-header">
                        <div className="header-section">
                            {user && (
                                <>
                                <div className="profile-img-wrapper">
                                    <img src={user.profileImg} alt="" />
                                </div>
                                <span className="name">{user.firstName} {user.lastName}</span>
                                </>
                            )}
                            <span>{getFormattedTime(update.createdAt)}</span>
                        </div>

                        {loggedinUser._id === update.createdBy &&
                            <button className="remove-update-btn clickable clear size-32  icon-end i-Delete" onClick={() => onRemoveUpdate(update.id)}>Delete</button>}
                    </div>
                    <div className="task-comment">
                        <TaskComment html={update.txt} />
                    </div>
                </div>
            )
            })}
        </section>
    )
}