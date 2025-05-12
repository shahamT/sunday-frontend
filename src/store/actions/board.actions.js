import { boardService } from "../../services/board";
import { ADD_BOARD, REMOVE_BOARD, REVERT_BOARDS, SET_BOARDS, SET_BOARD, UPDATE_BOARD } from "../reducers/board.reducer.js";
import { CLOSE_TASK_PANEL, OPEN_TASK_PANEL } from "../reducers/board.reducer.js";
import { BOARDS_LOADING_START, BOARDS_LOADING_DONE, BOARD_LOADING_START, BOARD_LOADING_DONE } from "../reducers/board.reducer.js";
import { ADD_GROUP, REMOVE_GROUP, REVERT_GROUPS, UPDATE_GROUP } from "../reducers/board.reducer.js";
import { ADD_COLUMN, REMOVE_COLUMN, REMOVE_COLUMN, UPDATE_COLUMN } from "../reducers/board.reducer.js";
import { store } from "../store.js";
import { useSelector } from 'react-redux'


// ========= CRUDL =========

// ===== Board ====
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

// ========= Group =========
export async function addGroup(boardId) {
    const group = boardService.getEmptyGroup()
    try {
        const savedGroup = await boardService.saveGroup(group, boardId)
        store.dispatch(getCmdAddGroup(savedGroup))
        return savedGroup
    } catch (err) {
        console.log('board action -> Cannot add group', err)
        throw err
    }
} 

export async function updateGroup(group, boardId) {
    try {
        const savedGroup = await boardService.saveGroup(group, boardId)
        store.dispatch(getCmdUpdateGroup(savedGroup))
        return savedGroup
    } catch (err) {
        console.log('board action -> Cannot save group', err)
        throw err
    }
} 

export async function removeGroup(groupId, boardId) {
    try {
        await boardService.removeGroup(groupId, boardId)
        store.dispatch(getCmdRemoveGroup(groupId))
    } catch (err) {
        console.log('board action -> Cannot remove group', err)
        store.dispatch({type: REVERT_GROUPS})
        throw err
    }
} 

// ========= Task =========
export async function addTask() {
    
} 

export async function updateTask() {

} 

export async function removeTask() {

} 

// ========= Column =========
export async function addColumn(type, boardId) {
        const column = boardService.getEmptyColumn(type)
    try {
        const savedColumn = await boardService.saveColumn(column, boardId)
        store.dispatch(getCmdAddColumn(savedColumn))
        return savedColumn
    } catch (err) {
        console.log('board action -> Cannot add column', err)
        throw err
    }
} 

export async function updateColumn(column, boardId) {
        try {
        const savedColumn = await boardService.saveColumn(column, boardId)
        store.dispatch(getCmdUpdateColumn(savedColumn))
        return savedColumn
    } catch (err) {
        console.log('board action -> Cannot save column', err)
        throw err
    }
} 

export async function removeColumn(columnId, boardId) {
    try {
        await boardService.removeColumn(columnId, boardId)
        store.dispatch(getCmdRemoveColumn(columnId))
    } catch (err) {
        console.log('board action -> Cannot remove column', err)
        store.dispatch({type: REVERT_COLUMNS})
        throw err
    }
} 


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
function getCmdRemoveGroup(groupId) {
    return {
        type: REMOVE_GROUP,
        groupId
    }
}
function getCmdAddGroup(group) {
    return {
        type: ADD_GROUP,
        group
    }
}
function getCmdUpdateGroup(group) {
    return {
        type: UPDATE_GROUP,
        group
    }
}

function getCmdRemoveColumn(columnId) {
    return {
        type: REMOVE_COLUMN,
        columnId
    }
}
function getCmdAddColumn(column) {
    return {
        type: ADD_COLUMN,
        column
    }
}
function getCmdUpdateColumn(column) {
    return {
        type: UPDATE_COLUMN,
        column
    }
}

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
