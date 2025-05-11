
import { storageService } from '../base/async-storage.service'
import testData from '../../../data-examples/boards.json'
import { makeId } from '../base/util.service'
import { userService } from '../user'

const STORAGE_KEY = 'board'

// _createBoards()

export const boardService = {
    query,
    getById,
    save,
    remove,
    // addBoardMsg
}
window.cs = boardService


async function query(filterBy = { txt: '', sortField: 'pos', sortDir: 1 }) {
    var boards = await storageService.query(STORAGE_KEY)
    const { txt, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.name))
    }
    if(sortField === 'pos'){
        boards.sort((board1, board2) => 
            (board1[sortField] - board2[sortField]) * +sortDir)
    }
    
    boards = boards.map(({ _id, name, pos, isStarred }) => ({ _id, name, pos, isStarred }))
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) { //TODO what valus must I add and where?
    var savedBoard
    if (board._id) {
        // const boardToSave = {
        //     _id: board._id,
        //     name: board.name,
        //     pos: board.pos
        // }
        savedBoard = await storageService.put(STORAGE_KEY, boardToSave)
    } else {
        // const boardToSave = {
        //     vendor: board.vendor,
        //     speed: board.speed,
        //     // Later, owner is set by the backend
        //     owner: userService.getLoggedinUser(),
        //     msgs: []
        // }
        savedBoard = await storageService.post(STORAGE_KEY, boardToSave)
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

function _createBoards() {
    // const testData = require('../../../data-examples/boards.json');
    // storageService.post(STORAGE_KEY, testData)
    testData.forEach(item => {
        storageService.post(STORAGE_KEY, item)
    })
}
 
