
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
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) { //TODO boardToSave in edit, actions depend on what i want to edit?
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
 
