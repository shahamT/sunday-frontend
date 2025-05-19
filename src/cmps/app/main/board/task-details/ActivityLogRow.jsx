// === Libs

import { useEffect, useState } from "react"
import { getFormattedTime, getShortRelativeTime } from "../../../../../services/base/util.service"

// === Services

// === Actions

// === Hooks / React

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function ActivityLogRow({ activity, task, board }) {
    // === Consts
    const [activityType, setActivityType] = useState(false)
    const [group, setGroup] = useState({})

    // === Effects
    useEffect(() =>{
        handleActivityType(activity.type)
    }, [board, task, activity])

    // === Functions
        function handleActivityType(type) {
        switch (type) {
            case 'add task':
                setActivityType('add task')
                const currGroup = board.groups.find(group => {
                    return group.tasks.find(t => t.id === task.id)
                })
                setGroup(currGroup)
                return

            case 'remove task':
                return

            case 'move task':
                if(activity.fromGroupId !== activity.toGroupId) {
                    setActivityType('move task')
                    const fromGroup = board.groups.find(g => g.id === activity.fromGroupId)
                    const toGroup = board.groups.find(g => g.id === activity.toGroupId)
                    // const currGroup = board.groups.find(group => {
                    //     return group.tasks.find(t => t.id === task.id)
                    // })
                    setGroup({fromGroup, toGroup})
                }
                return

            case 'set column value':
                const currColName = board.columns.find(col => col.id === activity.colId)?.name
                activity.colName = currColName || ''
                setActivityType('set column value')
                return

            case 'remove column value':
                return
        }
    }

    // if (!data) return <div>Loading...</div>
    return (
        <section className="ActivityLogRow">
            <section className="activity-row">
                <p className="time">{getShortRelativeTime(activity.createdAt)}</p>
                <img src={activity.createdBy} alt="" />
                <p className="task-name" >{task.columnValues[0]?.value}</p>
            </section>
            {activityType === 'move task' && 
            <section>
                <section className="activity-row move-task">
                    <p className="action-name">Moved</p>
                    <p>Group: <span className={`${group.fromGroup.color}-text`}>{group.fromGroup.name}</span></p>
                </section>
                <section className="activity-row move-task">
                    <p className="action-name">Moved</p>
                    <p>To group: <span className={`${group.toGroup.color}-text`}>{group.toGroup.name}</span></p>
                </section>
            </section>}
            {activityType === 'add task' && 
                <section className="activity-row add-task">
                    <p className="action-name">Created</p>
                    <p>Group: <span className={`${group.color}-text`}>{group.name}</span></p>
                </section>}
            {activityType === 'set column value' && 
                <section className="activity-row set column value">
                    <p className="action-name">{activity.colName}</p>
                    <div>{activity.prevValue || '-'}</div>
                    <div className="i-NavigationChevronRight">
                        <div>{activity.value}</div>
                    </div>
                </section>}
            {activityType === 'remove column value' && 
                <section className="activity-row remove column value">
                    <p className="action-name">{activity.colName}</p>
                    <div>{'-'}</div>
                    <div className="i-NavigationChevronRight">
                        <div>{activity.value}</div>
                    </div>
                </section>}
        </section>
    )
}