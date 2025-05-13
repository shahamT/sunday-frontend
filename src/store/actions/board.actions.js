import {
    ADD_BOARD, REMOVE_BOARD, REVERT_BOARDS, SET_BOARDS, SET_BOARD, UPDATE_BOARD,
    ADD_GROUP, REMOVE_GROUP, REVERT_GROUPS, UPDATE_GROUP,
    ADD_COLUMN, REMOVE_COLUMN, REVERT_COLUMNS, UPDATE_COLUMN,
    ADD_TASK, REMOVE_TASK, REVERT_TASKS,
    BOARDS_LOADING_START, BOARDS_LOADING_DONE,
    BOARD_LOADING_START, BOARD_LOADING_DONE,
    OPEN_TASK_PANEL, CLOSE_TASK_PANEL
} from "../reducers/board.reducer.js"
import { boardService } from "../../services/board";
import { store } from "../store.js";

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

export async function updateBoards(boards) {
    try {
        const savedBoards = await boardService.saveBoards(boards)
      store.dispatch(getCmdSetBoards(savedBoards))
      return savedBoards
    } catch (err) {
      console.error('board action -> Cannot save boards', err)
      throw err
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
        store.dispatch({ type: REVERT_BOARDS })
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
export async function addGroup() {
    const boardId = store.getState().boardModule.board._id
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

export async function updateGroup(group) {
    const boardId = store.getState().boardModule.board._id
    try {
        const savedGroup = await boardService.saveGroup(group, boardId)
        store.dispatch(getCmdUpdateGroup(savedGroup))

        return savedGroup
    } catch (err) {
        console.log('board action -> Cannot save group', err)
        throw err
    }
}

export async function removeGroup(groupId) {
    const boardId = store.getState().boardModule.board._id
    try {
        await boardService.removeGroup(groupId, boardId)
        store.dispatch(getCmdRemoveGroup(groupId))
        return { removed: true }
    } catch (err) {
        console.log('board action -> Cannot remove group', err)
        store.dispatch({ type: REVERT_GROUPS })
        throw err
    }
}

// ========= Task =========
export async function addTask(groupId = null) {
    const board = structuredClone(store.getState().boardModule.board)
    const boardId = board._id
    if (!groupId) {
        groupId = board.groups[0].id
    }

    const task = boardService.getEmptyTask()

    try {
        const savedTask = await boardService.saveTask(task, groupId, boardId)
        store.dispatch(getCmdAddTask(savedTask, groupId))
        return savedTask
    } catch (err) {
        console.log('board action -> Cannot add task', err)
        throw err
    }

}

export async function removeTask(taskId, groupId) {
    const boardId = store.getState().boardModule.board._id
    try {
        await boardService.removeTask(taskId, groupId, boardId)
        store.dispatch(getCmdRemoveTask(taskId, groupId))
    } catch (err) {
        console.log('board action -> Cannot remove task', err)
        store.dispatch({ type: REVERT_TASKS })
        throw err
    }
}

// export async function updateColumnValue(colId, taskId, value) {
//     const state = store.getState()
//     const board = structuredClone(store.getState().boardModule.board)

//     board.groups = board.groups.map(group => ({...group, tasks: group.tasks.map(task => {
//       if (task.id !== taskId) return task
//       const updatedColumnValues = task.columnValues.map(columnValue =>
//         columnValue.colId === colId ? { ...columnValue, value } : columnValue)
//         return { ...task, columnValues: updatedColumnValues }
//         })
//     }))

//     try {
//         const savedBoard = await boardService.save(board)
//         store.dispatch(getCmdSetBoard(savedBoard))
//     } catch (err) {
//         console.log('board action -> Cannot add column value', err)
//         throw err
//     }
// }

// export async function addColumnValue(taskId, colId, value) {
//   const state = store.getState()
//   const board = structuredClone(store.getState().boardModule.board)

//   board.groups = board.groups.map(group => ({...group, tasks: group.tasks.map(task => {
//       if (task.id !== taskId) return task
//       const hasColumn = task.columnValues.some(cv => cv.colId === colId)
//       const updatedColumnValues = hasColumn ? task.columnValues : [...task.columnValues, { colId, value }]

//       return { ...task, columnValues: updatedColumnValues }
//     })
//   }))

//   try {
//     const savedBoard = await boardService.save(board)
//     store.dispatch(getCmdSetBoard(savedBoard))
//   } catch (err) {
//     console.log('board action -> Cannot add column value', err)
//     throw err
//   }
// }

export async function setColumnValue(taskId, colId, value) {
    const board = structuredClone(store.getState().boardModule.board)
    board.groups = boardService.setColumnValue(board, taskId, colId, value)
    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdSetBoard(savedBoard))
    } catch (err) {
        console.log('board action -> Cannot set column value', err)
        throw err
    }
}

export async function removeColumnValue(taskId, colId) {
    const board = structuredClone(store.getState().boardModule.board)
    board.groups = boardService.removeColumnValue(board, taskId, colId)

    try {
        const savedBoard = await boardService.save(board)
        store.dispatch(getCmdSetBoard(savedBoard))
    } catch (err) {
        console.log('board action -> Cannot remove column value', err)
        throw err
    }
}

// ========= Column =========
export async function addColumn(type) {
    const boardId = store.getState().boardModule.board._id
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

export async function updateColumn(column) {
    const boardId = store.getState().boardModule.board._id
    try {
        const savedColumn = await boardService.saveColumn(column, boardId)
        store.dispatch(getCmdUpdateColumn(savedColumn))
        return savedColumn
    } catch (err) {
        console.log('board action -> Cannot save column', err)
        throw err
    }
}

export async function removeColumn(columnId) {
    const boardId = store.getState().boardModule.board._id
    try {
        await boardService.removeColumn(columnId, boardId)
        store.dispatch(getCmdRemoveColumn(columnId))
        return { removed: true }
    } catch (err) {
        console.log('board action -> Cannot remove column', err)
        store.dispatch({ type: REVERT_COLUMNS })
        throw err
    }
}

// ========= Task Details Panel =========
export function openTaskPanel() {
    store.dispatch({ type: OPEN_TASK_PANEL })
}

export function closeTaskPanel() {
    store.dispatch({ type: CLOSE_TASK_PANEL })
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

function getCmdAddTask(task, groupId) {
    return {
        type: ADD_TASK,
        task,
        groupId
    }
}

function getCmdRemoveTask(taskId, groupId) {
    return {
        type: REMOVE_TASK,
        taskId,
        groupId
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
