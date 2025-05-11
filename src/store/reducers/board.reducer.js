
import { boardService } from "../../services/board"

// //* Boards
export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'

//TODO CRUDL group, task, column

//Loading
export const BOARDS_LOADING_START = 'BOARDS_LOADING_START'
export const BOARDS_LOADING_DONE = 'BOARDS_LOADING_DONE'
export const BOARD_LOADING_START = 'BOARD_LOADING_START'
export const BOARD_LOADING_DONE = 'BOARD_LOADING_DONE'

// export const SET_BOARDS_FILTER_BY = 'SET_BOARDS_FILTER_BY'
// export const SET_BOARDS_IS_LOADING = 'SET_BOARDS_IS_LOADING'

// Task Details Panel
export const OPEN_TASK_PANEL = "OPEN_TASK_PANEL"
export const CLOSE_TASK_PANEL = "CLOSE_TASK_PANEL"

const initialState = {
    //board
    boards: [],
    board: null,
    isTaskPanelOpen: false,
    
    //Loading
    isBoardsLoading: false,
    isBoardLoading: false

    // isLoading: false,
    // filterBy: boardService.getDefaultFilter(),
}

export function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        // //* Boards
        case SET_BOARDS:
            return { ...state, boards: action.boards }

        case SET_BOARD:
            return { ...state, board: action.board }

        case REMOVE_BOARD:
            const lastBoards = [...state.boards]
            return {
                ...state,
                boards: state.boards.filter(board => board._id !== action.boardId),
                lastBoards
            }

        case ADD_BOARD:
            return {
                ...state,
                boards: [...state.boards, action.board]
            }

        case UPDATE_BOARD:
            return {
                ...state,
                boards: state.boards.map(board => board._id === action.board._id ? action.board : board)
            }

        // case SET_BOARDS_FILTER_BY:
        //     return {
        //         ...state,
        //         filterBy: { ...state.filterBy, ...action.filterBy }
        //     }

        //Loading

        case BOARDS_LOADING_START:
            return { ...state, isBoardsLoading: true }
    
        case BOARDS_LOADING_DONE:
            return { ...state, isBoardsLoading: false }

        case BOARD_LOADING_START:
            return { ...state, isBoardLoading: true }
    
        case BOARD_LOADING_DONE:
            return { ...state, isBoardLoading: false }

         //Side Nav

         case OPEN_TASK_PANEL:
            return {
                ...state,
                isTaskPanelOpen: true
            }
        case CLOSE_TASK_PANEL:
            return {
                ...state,
                isTaskPanelOpen: false
            }

        default: return state
    }
}