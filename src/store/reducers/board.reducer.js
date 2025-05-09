
// import { boardService } from "../../services/board.service.js"

// //* Boards
// export const SET_BOARDS = 'SET_BOARDS'
// export const REMOVE_BOARD = 'REMOVE_BOARD'
// export const ADD_BOARD = 'ADD_BOARD'
// export const UPDATE_BOARD = 'UPDATE_BOARD'

// export const SET_BOARDS_FILTER_BY = 'SET_BOARDS_FILTER_BY'
// export const SET_BOARDS_IS_LOADING = 'SET_BOARDS_IS_LOADING'

// Task Details Panel
export const OPEN_TASK_PANEL = "OPEN_TASK_PANEL"
export const CLOSE_TASK_PANEL = "CLOSE_TASK_PANEL"

const initialState = {
    // boards: [],
    // isLoading: false,
    // filterBy: boardService.getDefaultFilter(),

    isTaskPanelOpen: false,
}

export function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        // //* Boards
        // case SET_BOARDS:
        //     return { ...state, boards: action.boards }

        // case REMOVE_BOARD:
        //     const lastBoards = [...state.boards]
        //     return {
        //         ...state,
        //         boards: state.boards.filter(board => board._id !== action.boardId),
        //         lastBoards
        //     }

        // case ADD_BOARD:
        //     return {
        //         ...state,
        //         boards: [...state.boards, action.board]
        //     }

        // case UPDATE_BOARD:
        //     return {
        //         ...state,
        //         boards: state.boards.map(board => board._id === action.board._id ? action.board : board)
        //     }

        // case SET_BOARDS_FILTER_BY:
        //     return {
        //         ...state,
        //         filterBy: { ...state.filterBy, ...action.filterBy }
        //     }

        // case SET_BOARDS_IS_LOADING:
        //     return {
        //         ...state,
        //         isLoading: action.isLoading
        //     }

         //Side Nav

         case 'OPEN_TASK_PANEL':
            return {
                ...state,
                isTaskPanelOpen: true
            }
        case 'CLOSE_TASK_PANEL':
            return {
                ...state,
                isTaskPanelOpen: false
            }

        default: return state
    }
}