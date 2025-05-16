
import { storageService } from '../base/async-storage.service'
import testData from '../../../data-examples/boards.json'
import { makeId } from '../base/util.service'
import { userService } from '../user'

const STORAGE_KEY = 'board'
const colors = [
    'grass_green',
    'done-green',
    'bright-green',
    'saladish',
    'egg_yolk',
    'working_orange',
    'dark-orange',
    'peach',
    'sunset',
    'stuck-red',
    'dark-red',
    'sofia_pink',
    'lipstick',
    'bubble',
    'purple',
    'dark_purple',
    'berry',
    'dark_indigo',
    'indigo',
    'navy',
    'bright-blue',
    'dark-blue',
    'aquamarine',
    'chili-blue',
    'river',
    'winter',
    'explosive',
    'american_gray',
    'blackish',
    'brown',
    'orchid',
    'tan',
    'sky',
    'coffee',
    'royal',
    'teal',
    'lavender',
    'steel',
    'lilac',
    'pecan']


_createBoards()

export const boardService = {
    query,
    getById,
    save,
    remove,
    removeGroup,
    saveGroup,
    getColors,
    saveColumn,
    removeColumn,
    saveTask,
    removeTask,
    addTaskUpdate,
    setColumnValue,
    removeColumnValue,
    saveBoards,
    
}
window.cs = boardService

//////BOARD//////
async function saveBoards(newBoards) {
    const oldBoards = await storageService.query(STORAGE_KEY)

    const reorderedOldBoards = newBoards.map(newBoard =>
    oldBoards.find(oldBoard => oldBoard._id === newBoard._id))
    
    var savedBoards = await storageService.saveAll(STORAGE_KEY, reorderedOldBoards)
    return savedBoards
}

async function query() {
    var boards = await storageService.query(STORAGE_KEY)

    boards = boards.map(({ _id, name, isStarred }) => ({ _id, name, isStarred })) //BACKEND
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    const loggedinUser = userService.getLoggedinUser()?._id || null //BACKEND
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        const boardToSave = { //BACKEND
            _id: makeId(), //BACKEND
            isStarred: false, //BACKEND
            createdAt: Date.now(),  //BACKEND
            createdBy: loggedinUser, //BACKEND
            members: [//BACKEND 
                { //BACKEND
                    _id: loggedinUser, //BACKEND
                    permission: 'editor'//BACKEND
                }//BACKEND
            ]
        }
        savedBoard = await storageService.post(STORAGE_KEY, { ...board, ...boardToSave })
    }
    return savedBoard
}

async function addTaskUpdate(boardId, groupId, taskId, update) {
    const board = await getById(boardId)

    const boardToSave = {
        ...board, groups: board.groups.map(group => group.id === groupId
            ? { ...group, tasks: group.tasks.map(task => task.id === taskId
                ? {...task, updates: [update, ...task.updates]} : task )} : group)
    }    

    await storageService.put(STORAGE_KEY, boardToSave)

    return update
}

async function _createBoards() {
    const boards = await storageService.query(STORAGE_KEY)
        if (!boards || !boards.length) {
            for (const item of testData) {
                await storageService.post(STORAGE_KEY, item)
            }
        }
}

//////GROUP//////
async function saveGroup(groupToSave, boardId, isTop) {
    const board = await getById(boardId)
    if (!board) throw new Error(`Board ${boardId} not found`)
    if (!Array.isArray(board.groups)) board.groups = []
    var savedBoard
    if (groupToSave.id) {
        const boardToSave = { 
            ...board, groups: board.groups.map(group =>
                group.id === groupToSave.id ? groupToSave : group) 
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        const newGroups = isTop ? [groupToSave, ...board.groups] : [...board.groups, groupToSave]
        const boardToSave = { ...board, groups: newGroups }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    }
    return groupToSave
}

async function removeGroup(groupId, boardId) {
    const board = await getById(boardId)
    if (!board) throw new Error(`Board ${boardId} not found`)
    if (!Array.isArray(board.groups)) return
    board.groups = board.groups.filter(group => group.id !== groupId)
    await storageService.put(STORAGE_KEY, board)
}

function getColors() {
    return colors
}

//////COLUMN//////
async function saveColumn(columnToSave, boardId) {
    const board = await getById(boardId)
    if (!board) throw new Error(`Board ${boardId} not found`)
    if (!Array.isArray(board.columns)) board.columns = []
    var savedBoard
    if (columnToSave.id) {
        const boardToSave = {
            ...board, columns: board.columns.map(column =>
                column.id === columnToSave.id ? columnToSave : column)
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        const boardToSave = { ...board, columns: [...board.columns, columnToSave] }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    }
    return columnToSave
}

async function removeColumn(columnId, boardId) {
    const board = await getById(boardId)
    if (!board) throw new Error(`Board ${boardId} not found`)
    if (!Array.isArray(board.columns)) return

    board.columns = board.columns.filter(column => column.id !== columnId)
    await storageService.put(STORAGE_KEY, board)
}

//////TASK//////
async function saveTask(taskToSave, groupId, boardId, isTop = false) {
    const board = await getById(boardId)
    if (!board) throw new Error(`Board ${boardId} not found`)

    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    if (groupIdx === -1) throw new Error(`Group ${groupId} not found in board ${boardId}`) 

    const group = board.groups[groupIdx]
    if (!Array.isArray(group.tasks)) group.tasks = [] 

    const newTasks = isTop ? [taskToSave, ...group.tasks] : [...group.tasks, taskToSave] 
    const boardToSave = {
        ...board, groups: board.groups.map(group => group.id === groupId
            ? { ...group, tasks: [...group.tasks, taskToSave] } : group)
    }

    const savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    return taskToSave
}

async function removeTask(taskId, groupId, boardId) {
    const board = await getById(boardId)
    if (!board) throw new Error(`Board ${boardId} not found`)

    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    if (groupIdx === -1) throw new Error(`Group ${groupId} not found in board ${boardId}`)

    const group = board.groups[groupIdx]
    if (!Array.isArray(group.tasks)) group.tasks = []

    const boardToSave = {
        ...board, groups: board.groups.map(group => group.id === groupId
            ? { ...group, tasks: group.tasks.filter(task => task.id !== taskId) } : group)
    }
    await storageService.put(STORAGE_KEY, boardToSave)
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