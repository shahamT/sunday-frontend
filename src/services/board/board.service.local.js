
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

// _createBoards()

export const boardService = {
    query,
    getById,
    save,
    remove,
    // addBoardMsg
    removeGroup,
    saveGroup,
    getColors,
    saveColumn,
    removeColumn,
    saveTask,
    removeTask,
}
window.cs = boardService

//////BOARD//////
async function query(filterBy = { txt: '' }) {
    var boards = await storageService.query(STORAGE_KEY)
    const { txt, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.name))
    }
    
    boards = boards.map(({ _id, name, isStarred }) => ({ _id, name, isStarred }))
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        const boardToSave = {
            _id: makeId(),
            // isStarred: false,
            // createdAt: Date.now(),
            // members: [
            //     {
            //         _id: userService.getLoggedinUser()._id,
            //         permission: 'editor'
            //     }
            // ]
        }
        savedBoard = await storageService.post(STORAGE_KEY, {...board, ...boardToSave})
    }
    return savedBoard
}

// async function addBoardMsg(boardId, txt) {
//     // Later, this is all done by the backend
//     const board = await getById(boardId)

//     const msg = {
//         id: makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     board.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, board)

//     return msg
// }

async function _createBoards() {
    for (const item of testData) {
        await storageService.post(STORAGE_KEY, item)
    }
}

//////GROUP//////
async function saveGroup(groupToSave, boardId) { 
    const board = await getById(boardId)
    var savedBoard
    if (groupToSave.id) {
        const boardToSave = {...board, groups: board.groups.map(group =>
            group.id === groupToSave.id ? groupToSave : group)
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        groupToSave.id = makeId()
        groupToSave.createdAt = Date.now()
        groupToSave.createdBy = userService.getLoggedinUser()?._id || null
        const boardToSave = {...board, groups: {...groups, groupToSave}}
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    }
    return savedBoard
}

async function removeGroup(groupId, boardId) {
    const board = await getById(boardId)
    board.groups = board.groups.filter(group => group.id !== groupId)
    await storageService.put(STORAGE_KEY, board)
}

function getColors() {
    return colors
}

//////COLUMN//////
async function saveColumn(columnToSave, boardId) { 
    const board = await getById(boardId)
    var savedBoard
    if (columnToSave.id) {
        const boardToSave = {...board, columns: board.columns.map(column =>
            column.id === columnToSave.id ? columnToSave : column)
        }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        columnToSave.id = makeId()
        columnToSave.createdAt = Date.now()
        columnToSave.createdBy = userService.getLoggedinUser()?._id || null
        const boardToSave = {...board, columns: {...columns, columnToSave}}
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    }
    return savedBoard
}

async function removeColumn(columnId, boardId) {
    const board = await getById(boardId)
    board.columns = board.columns.filter(column => column.id !== columnId)
    await storageService.put(STORAGE_KEY, board)
}

//////TASK//////
async function saveTask(taskToSave, groupId, boardId) {
    const board = await getById(boardId)
    taskToSave.id = makeId()
    taskToSave.createdAt = Date.now()
    taskToSave.createdBy = userService.getLoggedinUser()?._id || null

    const boardToSave = {...board, groups: board.groups.map(group => group.id === groupId
    ? {...group, tasks: [...group.tasks, taskToSave]} : group)}

    const savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
    return savedBoard
}

async function removeTask(taskId, groupId, boardId) {
    const board = await getById(boardId)
    const boardToSave = {...board, groups: board.groups.map(group => group.id === groupId
        ? {...group, tasks: group.tasks.filter(task => task.id !== taskId)} : group)}
    await storageService.put(STORAGE_KEY, boardToSave)
}