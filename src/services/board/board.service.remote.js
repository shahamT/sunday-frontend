import { httpService } from '../base/http.service'

export const boardService = {
    query,
    getById,
    saveBoards,
    save,
    remove,
    removeGroup,
    createGroup,
    updateGroup,
    createColumn,
    updateColumn,
    removeColumn,
    createTask,
    removeTask,
    addTaskUpdate,
    setColumnValue,
    removeColumnValue,
}

//////BOARD//////

async function query() {
   
    //boards = boards.map(({ _id, name, isStarred }) => ({ _id, name, isStarred })) //BACKEND
    return httpService.get(`board/mini`)
}

async function getById(boardId) {
    return await httpService.get(`board/${boardId}`)
}

async function save(board) {
    return board._id
        ? httpService.put(`board/${board._id}`, board)
        : httpService.post('board', board)
}

async function saveBoards(reorderedBoards) {
    // const oldBoards = await httpService.get(`board`)

    // const reorderedOldBoards = newBoards.map(newBoard =>
    // oldBoards.find(oldBoard => oldBoard._id === newBoard._id))
    
    return httpService.put('board/reorder', reorderedBoards)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

//////GROUP//////

async function createGroup(group, boardId, isTop = false) {
    // const board = await getById(boardId)
    // if (!board) throw new Error(`Board ${boardId} not found`)
    // if (!Array.isArray(board.groups)) board.groups = []

    // const newGroups = isTop ? [groupToSave, ...board.groups] : [...board.groups, groupToSave]
    // const boardToSave = { ...board, groups: newGroups }

    return httpService.post(`board/${boardId}/group`, { group, isTop })

}

async function updateGroup(group, boardId) {
    // const board = await getById(boardId)
    // if (!board) throw new Error(`Board ${boardId} not found`)
    // if (!Array.isArray(board.groups)) board.groups = []

    // const boardToSave = {
    //     ...board, groups: board.groups.map(group =>
    //         group.id === groupToSave.id ? groupToSave : group)
    // }

    return httpService.put(`board/${boardId}/group/${group.id}`, group)
}

async function removeGroup(groupId, boardId) {
    // const board = await getById(boardId)
    // if (!board) throw new Error(`Board ${boardId} not found`)
    // if (!Array.isArray(board.groups)) return

    // const updatedGroups = board.groups.filter(group => group.id !== groupId)
    // board = {...board, groups: updatedGroups}

    return httpService.delete(`board/${boardId}/group/${groupId}`)
}

//////COLUMN//////

async function createColumn(column, boardId) {
    // const board = await getById(boardId)
    // if (!board) throw new Error(`Board ${boardId} not found`)
    // if (!Array.isArray(board.columns)) board.columns = []

    // const boardToSave = { ...board, columns: [...board.columns, columnToSave] }

    return httpService.post(`board/${boardId}/column`, column)

}

async function updateColumn(column, boardId) {
    // const board = await getById(boardId)
    // if (!board) throw new Error(`Board ${boardId} not found`)
    // if (!Array.isArray(board.columns)) board.columns = []

    // const boardToSave = {
    //         ...board, columns: board.columns.map(column =>
    //             column.id === columnToSave.id ? columnToSave : column)
    //     }

    return httpService.put(`board/${boardId}/column/${column.id}`, column)

}

async function removeColumn(columnId, boardId) {
    // const board = await getById(boardId)
    // if (!board) throw new Error(`Board ${boardId} not found`)
    // if (!Array.isArray(board.columns)) return

    // board.columns = board.columns.filter(column => column.id !== columnId)

    return httpService.delete(`board/${boardId}/column/${columnId}`)

}

//////TASK//////

async function createTask(task, boardId, groupId, isTop = false) {

    // const board = await getById(boardId)
    // if (!board) throw new Error(`Board ${boardId} not found`)
    
    // const groupIdx = board.groups.findIndex(group => group.id === groupId)
    // if (groupIdx === -1) throw new Error(`Group ${groupId} not found in board ${boardId}`)
    
    // const group = board.groups[groupIdx]
    // if (!Array.isArray(group.tasks)) group.tasks = []
    
    // const newTasks = isTop ? [taskToSave, ...group.tasks] : [...group.tasks, taskToSave]
    // const boardToSave = {
    //     ...board, groups: board.groups.map(group => group.id === groupId
    //         ? { ...group, tasks: newTasks } : group)
    // }
    
    return httpService.post(`board/${boardId}/group/${groupId}/task`, { task, isTop })

}

async function removeTask(taskId, groupId, boardId) {
    // const board = await getById(boardId)
    // if (!board) throw new Error(`Board ${boardId} not found`)

    // const groupIdx = board.groups.findIndex(group => group.id === groupId)
    // if (groupIdx === -1) throw new Error(`Group ${groupId} not found in board ${boardId}`)

    // const group = board.groups[groupIdx]
    // if (!Array.isArray(group.tasks)) group.tasks = []

    // const boardToSave = {
    //     ...board, groups: board.groups.map(group => group.id === groupId
    //         ? { ...group, tasks: group.tasks.filter(task => task.id !== taskId) } : group)
    // }
    return httpService.delete(`board/${boardId}/group/${groupId}/task/${taskId}`)
}

async function addTaskUpdate(update, boardId, groupId, taskId) {
    // const board = await getById(boardId)
    
    // const boardToSave = {
    //     ...board, groups: board.groups.map(group => group.id === groupId
    //         ? { ...group, tasks: group.tasks.map(task => task.id === taskId
    //             ? {...task, updates: [update, ...task.updates]} : task )} : group)
    // }    
    
    return httpService.post(`board/${boardId}/group/${groupId}/task/${taskId}/update`, update)

}

function setColumnValue(board, taskId, colId, value) {

    if (!Array.isArray(board.groups)) return []
    const groups = board.groups.map(group => ({
        ...group,
        tasks: group.tasks.map(task => {
            if (task.id !== taskId) return task

            const exists = task.columnValues.some(cv => cv.colId === colId)
            const columnValues = exists
                ? task.columnValues.map(cv => cv.colId === colId ? { ...cv, value } : cv)
                : [...task.columnValues, { colId, value }]

            
            return { ...task, columnValues }
        })
    }))
    return groups
}

function removeColumnValue(board, taskId, colId) {
    if (!Array.isArray(board.groups)) return []
    const groups = board.groups.map(group => ({
        ...group, tasks: group.tasks.map(task => {
            if (task.id !== taskId) return task

            const updatedColumnValues = task.columnValues.filter(columnValue => columnValue.colId !== colId)

            return { ...task, columnValues: updatedColumnValues }
        })
    }))
    return groups
} 