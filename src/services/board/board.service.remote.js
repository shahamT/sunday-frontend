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
    
    return httpService.put('board/boards/reorder', reorderedBoards)
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

//////GROUP//////

async function createGroup(group, boardId, isTop = false) {

    return httpService.post(`board/${boardId}/group`, { group, isTop })

}

async function updateGroup(group, boardId) {

    return httpService.put(`board/${boardId}/group/${group.id}`, group)
}

async function removeGroup(groupId, boardId) {

    return httpService.delete(`board/${boardId}/group/${groupId}`)
}

//////COLUMN//////

async function createColumn(column, boardId) {

    return httpService.post(`board/${boardId}/column`, column)

}

async function updateColumn(column, boardId) {

    return httpService.put(`board/${boardId}/column/${column.id}`, column)

}

async function removeColumn(columnId, boardId) {

    return httpService.delete(`board/${boardId}/column/${columnId}`)

}

//////TASK//////

async function createTask(task, boardId, groupId, isTop = false) {
    
    return httpService.post(`board/${boardId}/group/${groupId}/task`, { task, isTop })

}

async function removeTask(taskId, groupId, boardId) {

    return httpService.delete(`board/${boardId}/group/${groupId}/task/${taskId}`)
}

async function addTaskUpdate(update, boardId, groupId, taskId) {
    
    return httpService.post(`board/${boardId}/group/${groupId}/task/${taskId}/update`, update)

}

function setColumnValue(board, taskId, colId, value) {

    if (!Array.isArray(board.groups)) return

    const group = board.groups.find(group => group.tasks.some(task => task.id === taskId))
    if (!group) return
    const groupId = group.id

    const task = group.tasks.find(task => task.id === taskId)
    if (!task) return

    const colExists = task.columnValues.some(cv => cv.colId === colId)

    const method = colExists ? 'put' : 'post'

    return httpService[method](`board/${board._id}/group/${groupId}/task/${taskId}/columnValue/${colId}`, { value })
}

function removeColumnValue(board, taskId, colId) {
    if (!Array.isArray(board.groups)) return []

    const group = board.groups.find(group => group.tasks.some(task => task.id === taskId))
    if (!group) return
    const groupId = group.id

    return httpService.delete(`board/${board._id}/group/${groupId}/task/${taskId}/columnValue/${colId}`)
} 