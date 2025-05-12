
import { boardService } from "../../services/board"

// Boards
export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const REVERT_BOARDS = 'REVERT_BOARDS'

// Groups
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const REVERT_GROUPS = 'REVERT_GROUPS'

// Groups
export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const ADD_COLUMN = 'ADD_COLUMN'
export const UPDATE_COLUMN = 'UPDATE_COLUMN'
export const REVERT_COLUMNS = 'REVERT_COLUMNS'

//TODO CRUDL task

//Loading
export const BOARDS_LOADING_START = 'BOARDS_LOADING_START'
export const BOARDS_LOADING_DONE = 'BOARDS_LOADING_DONE'
export const BOARD_LOADING_START = 'BOARD_LOADING_START'
export const BOARD_LOADING_DONE = 'BOARD_LOADING_DONE'

// export const SET_BOARDS_FILTER_BY = 'SET_BOARDS_FILTER_BY'

// Task Details Panel
export const OPEN_TASK_PANEL = "OPEN_TASK_PANEL"
export const CLOSE_TASK_PANEL = "CLOSE_TASK_PANEL"

const initialState = {
    //board
    boards: [],
    lastBoards: [],
    board: null,
    isTaskPanelOpen: false,
    
    //Loading
    isBoardsLoading: false,
    isBoardLoading: false,

    //Group
    lastGroups: [],
    
    //Column
    lastColumns: [],

    // filterBy: boardService.getDefaultFilter(),
}

export function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        // //* BOARD
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
        
        case REVERT_BOARDS:
            return {...state, boards: state.lastBoards}

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

        case BOARDS_LOADING_START:
            return { ...state, isBoardsLoading: true }
    
        case BOARDS_LOADING_DONE:
            return { ...state, isBoardsLoading: false }

        case BOARD_LOADING_START:
            return { ...state, isBoardLoading: true }
    
        case BOARD_LOADING_DONE:
            return { ...state, isBoardLoading: false }

         //GROUP
         case REMOVE_GROUP:
            const lastGroups = [...state.boards.groups]
            return {
                ...state,
                boards: state.boards.groups.filter(group => group.id !== action.groupId),
                lastGroups
            }
        
        case REVERT_GROUPS:
            return {...state, boards: {...state.boards, groups: state.lastGroups} }

        case ADD_GROUP:
            return {
                ...state,
                boards: {...state.boards, groups: [...state.boards.groups, action.group]}
            }

        case UPDATE_GROUP:
            return {
                ...state,
                boards: state.boards.groups.map(group => group.id === action.group.id ? action.group : group)
            }

         //COLUMN
         case REMOVE_COLUMN:
            const lastColumns = [...state.boards.columns]
            return {
                ...state,
                boards: state.boards.columns.filter(column => column.id !== action.columnId),
                lastColumns
            }
        
        case REVERT_COLUMNS:
            return {...state, boards: {...state.boards, columns: state.lastColumns} }

        case ADD_COLUMN:
            return {
                ...state,
                boards: {...state.boards, groups: [...state.boards.groups, action.group]}
            }

        case UPDATE_COLUMN:
            return {
                ...state,
                boards: state.boards.columns.map(column => column.id === action.column.id ? action.column : column)
            }

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