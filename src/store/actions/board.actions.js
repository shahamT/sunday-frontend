import { boardService } from "../../services/board";
import { ADD_BOARD, REMOVE_BOARD, REVERT_BOARDS, SET_BOARDS, SET_BOARD, UPDATE_BOARD } from "../reducers/board.reducer.js";
import { CLOSE_TASK_PANEL, OPEN_TASK_PANEL } from "../reducers/board.reducer.js";
import { BOARDS_LOADING_START, BOARDS_LOADING_DONE, BOARD_LOADING_START, BOARD_LOADING_DONE } from "../reducers/board.reducer.js";
import { store } from "../store.js";
import { useSelector } from 'react-redux'


// ========= CRUDL =========

// ===== Load Board ====
export async function loadBoards() { //TODO add filterby as args
    // const filterBy = store.getState().boardModule.filterBy
    store.dispatch({ type: BOARDS_LOADING_START })
    
    try {
      const boards = await boardService.query() //TODO add filterby as args
      store.dispatch(getCmdSetBoards(boards))
    } catch (err) {
      console.log('board action -> Cannot load boards', err)
      throw err
    } finally {
      store.dispatch({ type: BOARDS_LOADING_DONE })
    }

}

export async function loadBoard(boardId) {
  store.dispatch({ type: BOARD_LOADING_START })
    try {
        const board = await boardService.getById(boardId)
        store.dispatch(getCmdSetBoard(board))
    } catch (err) {
        console.log('board action -> Cannot load board', err)
        throw err
    } finally {
      store.dispatch({ type: BOARD_LOADING_DONE })
    }
}

// ===== Remove Board ====
export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getCmdRemoveBoard(boardId))
    } catch (err) {
        console.log('board action -> Cannot remove board', err)
        store.dispatch({type: REVERT_BOARDS})
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdUpdateBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('board action -> Cannot save board', err)
        throw err
    }
}

export async function addBoard(board) {
    
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('board action -> Cannot add board', err)
        throw err
    }
}

// export async function addBoardMsg(boardId, txt) {
//     try {
//         const msg = await boardService.addBoardMsg(boardId, txt)
//         store.dispatch(getCmdAddBoardMsg(msg))
//         return msg
//     } catch (err) {
//         console.log('Cannot add board msg', err)
//         throw err
//     }
// }

// // ========= FilterBy =========
// export function setFilterBy(filterBy) {
//     store.dispatch({ type: SET_BOARDS_FILTER_BY, filterBy })
// }


// ========= Task Details Panel =========
export function openTaskPanel() {
  store.dispatch({ type: OPEN_TASK_PANEL})
}

export function closeTaskPanel() {
  store.dispatch({ type: CLOSE_TASK_PANEL})
}

// Command Creators:
function getCmdSetBoards(boards) {
    return {
        type: SET_BOARDS,
        boards
    }
}
function getCmdSetBoard(board) {
    return {
        type: SET_BOARD,
        board
    }
}
function getCmdRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
function getCmdAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
function getCmdUpdateBoard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}
// function getCmdAddBoardMsg(msg) {
//     return {
//         type: ADD_BOARD_MSG,
//         msg
//     }
// }

// unitTestActions()
async function unitTestActions() {
    await loadBoards()
    await addBoard(boardService.getEmptyBoard())
    await updateBoard({
        _id: 'm1oC7',
        // vendor: 'Board-Good',
    })
    await removeBoard('m1oC7')
    // TODO unit test addBoardMsg
}
