

// import { boardService } from "../../services/board.service.js";
// import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, SET_BOARDS_FILTER_BY, SET_BOARDS_IS_LOADING, UPDATE_BOARD } from "../reducers/board.reducer.js";
import { CLOSE_TASK_PANEL, OPEN_TASK_PANEL } from "../reducers/board.reducer.js";
import { store } from "../store.js";


// // ========= CRUDL =========

// // ===== Load Board ====
// export function loadBoards() {
//     const filterBy = store.getState().boardModule.filterBy
//     store.dispatch({ type: SET_BOARDS_IS_LOADING, isLoading: true })
//     return boardService.query(filterBy)
//         .then(boards => {
//             store.dispatch({ type: SET_BOARDS, boards })
//         })
//         .catch(err => {
//             console.log('board action -> Cannot load boards', err)
//             throw err
//         })
//         .finally(() => {
//             store.dispatch({ type: SET_BOARDS_IS_LOADING, isLoading: false })
//         })
// }

// // ===== Remove Board ====
// export function removeBoard(boardId) {
//     return boardService.remove(boardId)
//         .then(() => {
//             store.dispatch({ type: REMOVE_BOARD, boardId })
//         })
//         .catch(err => {
//             console.log('board action -> Cannot remove board', err)
//             throw err
//         })
// }

// // ===== Save Board ====
// export function saveBoard(board) {
//     const type = board._id ? UPDATE_BOARD : ADD_BOARD
//     return boardService.save(board)
//         .then(savedBoard => {
//             console.log('savedBoard:', savedBoard)
//             store.dispatch({ type, board: savedBoard })
//             return savedBoard
//         })
//         .catch(err => {
//             console.log('board action -> Cannot save board', err)
//             throw err
//         })
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