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
    removeTaskUpdate,
    setColumnValue,
    removeColumnValue,
    moveTask,
    updateLabel,
    createLabel,
    removeLabel,
    createLog
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
    
    return httpService.put('board/boards/reorder', { reorderedBoards })
}

async function remove(boardId) {
    return httpService.delete(`board/${boardId}`)
}

//////GROUP//////

async function createGroup(group, boardId, isTop = false, idx) {

    return httpService.post(`board/${boardId}/group`, { group, isTop, idx })

}

async function updateGroup(group, boardId) {

    return httpService.put(`board/${boardId}/group/${group.id}`, { group })
}

async function removeGroup(groupId, boardId) {

    return httpService.delete(`board/${boardId}/group/${groupId}`)
}

//////COLUMN//////

async function createColumn(column, boardId) {

    return httpService.post(`board/${boardId}/column`, { column })

}

async function updateColumn(column, boardId) {

    return httpService.put(`board/${boardId}/column/${column.id}`, { column })

}

async function removeColumn(columnId, boardId) {
    
    return httpService.delete(`board/${boardId}/column/${columnId}`)
    
    
    
}
//////LABEL//////
async function updateLabel(boardId, columnId,labelToUpdate) {

    return httpService.put(`board/${boardId}/column/${columnId}/label/${labelToUpdate.id}`, { labelToUpdate })

    
}

async function createLabel(label, columnId, boardId) {

    return httpService.post(`board/${boardId}/column/${columnId}/label`, { label })

}

async function removeLabel(labelId,columnId, boardId) {
    
    return httpService.delete(`board/${boardId}/column/${columnId}/label/${labelId}`)
    
    
    
}



//////TASK//////

async function createTask(task, boardId, groupId, isTop = false) {
    
    return httpService.post(`board/${boardId}/group/${groupId}/task`, { task, isTop })

}

async function removeTask(taskId, groupId, boardId) {

    return httpService.delete(`board/${boardId}/group/${groupId}/task/${taskId}`)
}

async function addTaskUpdate(boardId, groupId, taskId, update) {
    
    return httpService.post(`board/${boardId}/group/${groupId}/task/${taskId}/update`, { update })

}

async function removeTaskUpdate(boardId, groupId, taskId, updateId) {
    
    return httpService.post(`board/${boardId}/group/${groupId}/task/${taskId}/update/${updateId}`)

}

function setColumnValue(board, taskId, colId, value) { //add the before value

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

async function moveTask(taskId, fromGroupId, toGroupId, toIndex, boardId) {

  return httpService.put(`board/${boardId}/task/${taskId}`, { fromGroupId, toGroupId, toIndex })
}

async function createLog(logObject, boardId) {

    return httpService.put(`board/${boardId}/log`, {logObject})

}