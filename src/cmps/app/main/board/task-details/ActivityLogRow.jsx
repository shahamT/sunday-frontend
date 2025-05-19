// === Libs

import { useEffect, useState } from "react"
import { getFormattedTime } from "../../../../../services/base/util.service"

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
    // const [group, setGroup] = useState({})
    const [colName, setColName] = useState('')

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
                    // setGroup(currGroup)
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
        <section className="ComponentName">
            {activityType === 'move task' && 
            <section>
                <section className="move-task">
                    <p>{getFormattedTime(activity.createdAt)}</p>
                    <img src={activity.profileImg} alt="" />
                    <p>{task.columnValues[0]?.value}</p>
                    <p>Moved</p>
                    <p>Group: <span className={`${fromGroup.color}-text`}>{fromGroup.name}</span></p>
                </section>
                <section className="move-task">
                    <p>{getFormattedTime(activity.createdAt)}</p>
                    <img src={activity.profileImg} alt="" />
                    <p>{task.columnValues[0]?.value}</p>
                    <p>Moved</p>
                    <p>To group: <span className={`${toGroup.color}-text`}>{toGroup.name}</span></p>
                </section>
            </section>}
            {activityType === 'add task' && 
                <section className="add-task">
                    <p>{getFormattedTime(activity.createdAt)}</p>
                    <img src={activity.profileImg} alt="" />
                    <p>{task.columnValues[0]?.value}</p>
                    <p>Created</p>
                    <p>Group: <span className={`${group.color}-text`}>{group.name}</span></p>
                </section>}
            {activityType === 'set column value' && 
                <section className="set column value">
                    <p>{getFormattedTime(activity.createdAt)}</p>
                    <img src={activity.profileImg} alt="" />
                    <p>{task.columnValues[0]?.value}</p>
                    <p>{activity.colName}</p>
                    <div>{activity.prevValue || '-'}</div>
                    <div>{activity.value}</div>
                </section>}
            {activityType === 'remove column value' && 
                <section className="remove column value">
                    <p>{getFormattedTime(activity.createdAt)}</p>
                    <img src={activity.profileImg} alt="" />
                    <p>{task.columnValues[0]?.value}</p>
                    <p>{activity.colName}</p>
                    <div>{'-'}</div>
                    <div>{activity.value}</div>
                </section>}
        </section>
    )
}