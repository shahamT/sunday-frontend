import {
    ADD_BOARD, REMOVE_BOARD, REVERT_BOARDS, REVERT_BOARD, SET_BOARDS, SET_BOARD, UPDATE_BOARD, UPDATE_BOARD_FROM_SOCKET, UPDATE_MINI_BOARDS_FROM_SOCKET,
    ADD_GROUP, REMOVE_GROUP, UPDATE_GROUP,
    ADD_COLUMN, REMOVE_COLUMN, UPDATE_COLUMN, UPDATE_LABEL, ADD_LABEL, REMOVE_LABEL,
    ADD_TASK, REMOVE_TASK, ADD_TASK_UPDATE, SET_COLUMN_VALUE, REMOVE_COLUMN_VALUE, MOVE_TASK,
    BOARDS_LOADING_START, BOARDS_LOADING_DONE,
    BOARD_LOADING_START, BOARD_LOADING_DONE,
    SET_BOARD_FILTER_BY,
    OPEN_TASK_PANEL, CLOSE_TASK_PANEL,SET_BOARDS_FILTER_BY,
    CREATE_LOG
} from "../reducers/board.reducer.js"
import { boardService } from "../../services/board";
import { store } from "../store.js";
import { userReducer } from "../reducers/user.reducer.js";
import { userService } from "../../services/user/user.service.remote.js";
import { makeId } from "../../services/base/util.service.js";

// ========= CRUDL =========
// ===== Board ====
export async function loadBoards() {
    // const filterBy = store.getState().boardModule.filterBy
    store.dispatch({ type: BOARDS_LOADING_START })

    try {
        const boards = await boardService.query()
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
        store.dispatch(getCmdSetBoards(boards))
        const savedBoards = await boardService.saveBoards(boards)
        return savedBoards
    } catch (err) {
        store.dispatch({ type: REVERT_BOARDS })
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
        store.dispatch(getCmdRemoveBoard(boardId))
        await boardService.remove(boardId)
    } catch (err) {
        store.dispatch({ type: REVERT_BOARDS })
        console.log('board action -> Cannot remove board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log(savedBoard)
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

// // ========= FilterBy =========
export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_BOARD_FILTER_BY, filterBy })
}
export function setBoardsFilterBy(boardsFilterBy) {
    store.dispatch({ type: SET_BOARDS_FILTER_BY, boardsFilterBy })
}

// ========= Group =========
export async function addGroup(isTop = false) {
    const boardId = getBoardId()
    const group = boardService.getEmptyGroup()
    try {
        store.dispatch(getCmdAddGroup(group, isTop))
        const savedGroup = await boardService.createGroup(group, boardId, isTop)
        return savedGroup
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot add group', err)
        throw err
    }
}

export async function updateGroup(group) {
    const boardId = getBoardId()
    try {
        store.dispatch(getCmdUpdateGroup(group))
        const savedGroup = await boardService.updateGroup(group, boardId)

        return savedGroup
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot save group', err)
        throw err
    }
}

export async function removeGroup(groupId) {
    const boardId = getBoardId()
    try {
        store.dispatch(getCmdRemoveGroup(groupId))
        await boardService.removeGroup(groupId, boardId)
        return { removed: true }
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot remove group', err)
        throw err
    }
}

// ========= Task =========
export async function addTask({ valueToSave = 'New item', itemColId, isTop = false, groupId }) {
    const board = structuredClone(getBoard())
    const boardId = board._id
    if (!groupId) {
        groupId = board.groups[0].id
    }

    const task = await boardService.getEmptyTask(valueToSave, itemColId)
    try {
        store.dispatch(getCmdAddTask(task, groupId, isTop))
        await createLog({type:'add task', taskId: task.id, valueToSave})
        const savedTask = await boardService.createTask(task, boardId, groupId, isTop)
        return savedTask
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot add task', err)
        throw err
    }

}

export async function removeTask(taskId, groupId) {
    const boardId = getBoardId()
    try {
        store.dispatch(getCmdRemoveTask(taskId, groupId))
        await createLog({type:'remove task', taskId})
        await boardService.removeTask(taskId, groupId, boardId)
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot remove task', err)
        throw err
    }
}


export async function moveTask({ task, fromGroupId, toGroupId, toIndex }) {
    const board = structuredClone(store.getState().boardModule.board)
    const boardId = board._id

    try {
        store.dispatch(getCmdMoveTask(task, fromGroupId, toGroupId, toIndex))
        await boardService.moveTask(task.id, fromGroupId, toGroupId, toIndex, boardId)
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot move task', err)
        throw err
    }
  try {
    store.dispatch(getCmdMoveTask(task, fromGroupId, toGroupId, toIndex))
    await createLog({type:'move task', taskId: task.id, fromGroupId, toGroupId})
    await boardService.moveTask(task.id, fromGroupId, toGroupId, toIndex, boardId)
  } catch (err) {
    store.dispatch({ type: REVERT_BOARD })
    console.log('board action -> Cannot move task', err)
    throw err
  }
}



export async function addTaskUpdate(boardId, groupId, taskId, txt) {
    const update = boardService.getEmptyUpdate(txt)
    try {
        store.dispatch(getCmdAddTaskUpdate(groupId, taskId, update))
        await boardService.addTaskUpdate(boardId, groupId, taskId, update)
        return update
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('Cannot add board msg', err)
        throw err
    }
}

export async function setColumnValue(taskId, colId, value, prevValue) {
    const board = structuredClone(getBoard())

    try {
        store.dispatch(getCmdSetColumnValue(board, taskId, colId, value))
        await boardService.setColumnValue(board, taskId, colId, value)
        await createLog({type:'set column value', taskId, colId, value, prevValue})
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot set column value', err)
        throw err
    }
}

export async function removeColumnValue(taskId, colId, prevValue) {
    const board = structuredClone(getBoard())

    try {
        store.dispatch(getCmdRemoveColumnValue(board, taskId, colId))
        await boardService.removeColumnValue(board, taskId, colId)
        await createLog({type:'set column value', taskId, colId, prevValue})
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot remove column value', err)
        throw err
    }
}
// export async function setColumnValue(taskId, colId, value) { OLD - LOCAL
//     const board = structuredClone(store.getState().boardModule.board)
//     board.groups = boardService.setColumnValue(board, taskId, colId, value)
//     try {
//         store.dispatch(getCmdSetBoard(board))
//         await boardService.save(board)
//     } catch (err) {
//         store.dispatch({ type: REVERT_BOARD })
//         console.log('board action -> Cannot set column value', err)
//         throw err
//     }
// }

// export async function removeColumnValue(taskId, colId) { OLD - LOCAL
//     const board = structuredClone(store.getState().boardModule.board)
//     board.groups = boardService.removeColumnValue(board, taskId, colId)

//     try {
//         store.dispatch(getCmdSetBoard(board))
//         await boardService.save(board)
//     } catch (err) {
//         store.dispatch({ type: REVERT_BOARD })
//         console.log('board action -> Cannot remove column value', err)
//         throw err
//     }
// }

// ========= Column =========
export async function addColumn(type) {
    const boardId = getBoardId()
    const column = boardService.getEmptyColumn(type)
    try {
        store.dispatch(getCmdAddColumn(column))
        const savedColumn = await boardService.createColumn(column, boardId)
        return savedColumn
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot add column', err)
        throw err
    }
}

export async function updateColumn(column) {
    const boardId = getBoardId()
    try {
        store.dispatch(getCmdUpdateColumn(column))
        const savedColumn = await boardService.updateColumn(column, boardId)
        return savedColumn
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot save column', err)
        throw err
    }
}

export async function removeColumn(columnId) {
    const boardId = getBoardId()
    try {
        store.dispatch(getCmdRemoveColumn(columnId))
        await boardService.removeColumn(columnId, boardId)
        return { removed: true }
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot remove column', err)
        throw err
    }
}
// ========= Status Lables =========

export async function updateLabel(columnId, labelToUpdate) {
    const boardId = getBoardId()
    try {
        store.dispatch(getCmdUpdateLabel(columnId, labelToUpdate))
        const savedLabel = await boardService.updateLabel(boardId, columnId, labelToUpdate)
        return savedLabel
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot save label', err)
        throw err
    }
}

export async function addLabel(columnId,label) {
    const boardId = getBoardId()
    // const label = boardService.getEmptyLabel()
    try {
        store.dispatch(getCmdAddLabel(label,columnId,boardId))
        const savedLabel = await boardService.createLabel(label, columnId, boardId)
        return savedLabel
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot add column', err)
        throw err
    }
}

export async function removeLabel(labelId, columnId) {
    const boardId = getBoardId()
    try {
        store.dispatch(getCmdRemoveLabel(labelId, columnId))
        await boardService.removeLabel(labelId, columnId, boardId)
        return { removed: true }
    } catch (err) {
        store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot remove column', err)
        throw err
    }
}

// ========= ================= =========

export async function createLog(logObject) {
    const boardId = getBoardId()
    logObject.id = makeId()
    logObject.createdAt = Date.now()
    logObject.createdBy = userService.getLoggedinUser().profileImg
    try {
        store.dispatch(getCmdCreateLog(logObject))
        await boardService.createLog(logObject, boardId)
        return logObject
    } catch (err) {
        // store.dispatch({ type: REVERT_BOARD })
        console.log('board action -> Cannot log action', err)
        throw err
    }
}

function getBoardId() {
    return store.getState().boardModule.board._id
}

function getBoard() {
    return store.getState().boardModule.board
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

export function getCmdUpdateBoardFromSocket(board) {
    return {
        type: UPDATE_BOARD_FROM_SOCKET,
        board
    }
}

export function getCmdUpdateMiniBoardsFromSocket(boards) {
    return {
        type: UPDATE_MINI_BOARDS_FROM_SOCKET,
        boards
    }
}

function getCmdRemoveGroup(groupId) {
    return {
        type: REMOVE_GROUP,
        groupId
    }
}

function getCmdAddGroup(group, isTop) {
    return {
        type: ADD_GROUP,
        group,
        isTop
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

function getCmdAddTask(task, groupId, isTop) {
    return {
        type: ADD_TASK,
        task,
        groupId,
        isTop
    }
}

function getCmdRemoveTask(taskId, groupId) {
    return {
        type: REMOVE_TASK,
        taskId,
        groupId
    }
}

function getCmdAddTaskUpdate(groupId, taskId, update) {
    return {
        type: ADD_TASK_UPDATE,
        groupId,
        taskId,
        update
    }
}

function getCmdSetColumnValue(board, taskId, colId, value) {
    return {
        type: SET_COLUMN_VALUE,
        board,
        taskId,
        colId,
        value
    }
}

function getCmdRemoveColumnValue(board, taskId, colId) {
    return {
        type: REMOVE_COLUMN_VALUE,
        board,
        taskId,
        colId,
    }
}

export function getCmdMoveTask(task, fromGroupId, toGroupId, toIndex) {
    return {
        type: MOVE_TASK,
        task,
        fromGroupId,
        toGroupId,
        toIndex,
    }
}

export function getCmdCreateLog(logObject) {
  return {
    type: CREATE_LOG,
    logObject
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
