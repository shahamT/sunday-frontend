
import { boardService } from "../../services/board"

// Boards
export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const REVERT_BOARDS = 'REVERT_BOARDS'
export const REVERT_BOARD = 'REVERT_BOARD'

// Groups
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const REVERT_GROUPS = 'REVERT_GROUPS'

// Columns
export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const ADD_COLUMN = 'ADD_COLUMN'
export const UPDATE_COLUMN = 'UPDATE_COLUMN'
export const REVERT_COLUMNS = 'REVERT_COLUMNS'

// Tasks
export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const REVERT_TASKS = 'REVERT_TASKS'

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
    lastBoard: {},
    board: null,
    isTaskPanelOpen: false,

    //Loading
    isBoardsLoading: false,
    isBoardLoading: false,

    // filterBy: boardService.getDefaultFilter(),
}

export function boardReducer(state = initialState, action = {}) {
    let lastBoard = {}
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
            return {...state, boards: state.lastBoards, lastBoards: []}

        case REVERT_BOARD:
            return {...state, board: state.lastBoard, lastBoard: {}}

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

            lastBoard = {...state.board}

            return {
                ...state,
                board: {...state.board, groups: state.board.groups.filter(group => group.id !== action.groupId)},
                lastBoard,
            }

        case ADD_GROUP:

            lastBoard = {...state.board}

            return {
                ...state,
                board: { ...state.board, groups: action.isTop ? [action.group, ...state.board.groups] : [...state.board.groups, action.group] },
                lastBoard
            }

        case UPDATE_GROUP:
            return {
                ...state,
                board: {...state.board, groups: state.board.groups.map(group => group.id === action.group.id ? action.group : group)}
            }

        //COLUMN
        case REMOVE_COLUMN:

            lastBoard = {...state.board}

            return {
                ...state,
                board: {...state.board, columns: state.board.columns.filter(column => column.id !== action.columnId)},
                lastBoard
            }

        case ADD_COLUMN:

            lastBoard = {...state.board}

            return {
                ...state,
                board: {...state.board, columns: [...state.board.columns, action.column]},
                lastBoard
            }

        case UPDATE_COLUMN:

            lastBoard = {...state.board}

            return {
                ...state,
                board: {...state.board, columns: state.board.columns.map(column => column.id === action.column.id ? action.column : column)},
                lastBoard
            }

         //TASKS
         case REMOVE_TASK:

            lastBoard = {...state.board}

            return {
                ...state,
                board: {
                    ...state.board, groups: state.board.groups.map(group => group.id === action.groupId
                        ? { ...group, tasks: group.tasks.filter(task => task.id !== action.taskId) } : group)
                },
                lastBoard
            }

        case ADD_TASK:

            lastBoard = {...state.board}

            return {
                ...state,
                board: {
                    ...state.board, groups: state.board.groups.map(group => group.id === action.groupId
                        ? { ...group, tasks: action.isTop ? [action.task, ...group.tasks] : [...group.tasks, action.task] } : group)},
                lastBoard
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