import { boardService } from "../../services/board"

export const CREATE_LOG = 'CREATE_LOG'

// Boards
export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const REVERT_BOARDS = 'REVERT_BOARDS'
export const REVERT_BOARD = 'REVERT_BOARD'
export const UPDATE_BOARD_FROM_SOCKET = 'UPDATE_BOARD_FROM_SOCKET'
export const UPDATE_MINI_BOARDS_FROM_SOCKET = 'UPDATE_MINI_BOARDS_FROM_SOCKET'

// Groups
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'

// Columns
export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const ADD_COLUMN = 'ADD_COLUMN'
export const UPDATE_COLUMN = 'UPDATE_COLUMN'


// Labels
export const UPDATE_LABEL = 'UPDATE_LABEL'
export const ADD_LABEL = 'ADD_LABEL'
export const REMOVE_LABEL = 'REMOVE_LABEL'


// Tasks
export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const MOVE_TASK = 'MOVE_TASK'
export const ADD_TASK_UPDATE = 'ADD_TASK_UPDATE'
export const REMOVE_TASK_UPDATE = 'REMOVE_TASK_UPDATE'
export const SET_COLUMN_VALUE = 'SET_COLUMN_VALUE'
export const REMOVE_COLUMN_VALUE = 'REMOVE_COLUMN_VALUE'

//Loading
export const BOARDS_LOADING_START = 'BOARDS_LOADING_START'
export const BOARDS_LOADING_DONE = 'BOARDS_LOADING_DONE'
export const BOARD_LOADING_START = 'BOARD_LOADING_START'
export const BOARD_LOADING_DONE = 'BOARD_LOADING_DONE'

export const SET_BOARD_FILTER_BY = 'SET_BOARD_FILTER_BY'
export const SET_BOARDS_FILTER_BY = 'SET_BOARDS_FILTER_BY'

// Task Details Panel
export const OPEN_TASK_PANEL = "OPEN_TASK_PANEL"
export const CLOSE_TASK_PANEL = "CLOSE_TASK_PANEL"

const initialState = {
    //board
    boards: '',
    lastBoards: [],
    lastBoard: {},
    board: null,
    isTaskPanelOpen: false,

    //Loading
    isBoardsLoading: false,
    isBoardLoading: false,

    filterBy: boardService.getDefaultFilter(),
    boardsFilterBy: boardService.getDefaultFilter(),
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
                board: state.board?._id === action.boardId ? null : state.board,
                lastBoards
            }

        case REVERT_BOARDS:
            return { ...state, boards: state.lastBoards, lastBoards: [] }

        case REVERT_BOARD:
            return { ...state, board: state.lastBoard, lastBoard: {} }

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

        case UPDATE_BOARD_FROM_SOCKET:

            return {
                ...state,
                board: action.board
            }

        case UPDATE_MINI_BOARDS_FROM_SOCKET:

            return {
                ...state,
                boards: action.boards
            }

        case CREATE_LOG:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: { ...state.board, activities: [action.logObject, ...state.board.activities] },
                lastBoard
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

            lastBoard = { ...state.board }

            return {
                ...state,
                board: { ...state.board, groups: state.board.groups.filter(group => group.id !== action.groupId) },
                lastBoard,
            }

        case ADD_GROUP:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: {
                    ...state.board, groups: (() => {
                        const groups = [...state.board.groups]
                        if (action.idx !== null && typeof action.idx === 'number') {
                            const insertAt = action.idx + 1
                            groups.splice(insertAt, 0, action.group)
                            return groups
                        }
                        return action.isTop
                            ? [action.group, ...groups]
                            : [...groups, action.group]
                    })()
                },
                lastBoard
            }

        case UPDATE_GROUP:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: { ...state.board, groups: state.board.groups.map(group => group.id === action.group.id ? action.group : group) },
                lastBoard
            }

        //COLUMN
        case REMOVE_COLUMN:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: { ...state.board, columns: state.board.columns.filter(column => column.id !== action.columnId) },
                lastBoard
            }

        case ADD_COLUMN:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: { ...state.board, columns: [...state.board.columns, action.column] },
                lastBoard
            }

        case UPDATE_COLUMN:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: { ...state.board, columns: state.board.columns.map(column => column.id === action.column.id ? action.column : column) },
                lastBoard
            }


        // LABELS
        case UPDATE_LABEL: {
            const { columnId, labelToUpdate } = action
            const lastBoard = { ...state.board }

            return {
                ...state,
                board: {
                    ...state.board,
                    columns: state.board.columns.map(column => {
                        if (column.id !== columnId) return column;

                        const updatedLabels = column.type.labels?.map(label =>
                            label.id === labelToUpdate.id ? labelToUpdate : label
                        );

                        return {
                            ...column,
                            type: {
                                ...column.type,
                                labels: updatedLabels
                            }
                        }
                    })
                },
                lastBoard
            }
        }
        case ADD_LABEL: {
            const { columnId, label } = action;
            const lastBoard = { ...state.board }

            const updatedColumns = state.board.columns.map(column => {
                if (column.id === columnId && column.type?.labels) {
                    return {
                        ...column,
                        type: {
                            ...column.type,
                            labels: [...column.type.labels, label]
                        }
                    };
                }
                return column
            })

            return {
                ...state,
                board: {
                    ...state.board,
                    columns: updatedColumns
                },
                lastBoard
            }
        }

        case REMOVE_LABEL:
            lastBoard = { ...state.board }
            return {
                ...state,
                board: {
                    ...state.board,
                    columns: state.board.columns.map(column => {
                        if (column.id !== action.columnId) return column
                        return {
                            ...column,
                            type: {
                                ...column.type,
                                labels: column.type.labels.filter(label => label.id !== action.labelId)
                            }
                        }
                    })
                },
                lastBoard
            }


        //TASKS
        case REMOVE_TASK:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: {
                    ...state.board, groups: state.board.groups.map(group => group.id === action.groupId
                        ? { ...group, tasks: group.tasks.filter(task => task.id !== action.taskId) } : group)
                },
                lastBoard
            }

        case ADD_TASK:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: {
                    ...state.board, groups: state.board.groups.map(group => group.id === action.groupId
                        ? { ...group, tasks: action.isTop ? [action.task, ...group.tasks] : [...group.tasks, action.task] } : group)
                },
                lastBoard
            }

        case MOVE_TASK: {
            const { task, fromGroupId, toGroupId, toIndex } = action
            const groups = [...state.board.groups]

            const fromGroup = groups.find(g => g.id === fromGroupId)
            const toGroup = groups.find(g => g.id === toGroupId)
            if (!fromGroup || !toGroup) return state

            fromGroup.tasks = fromGroup.tasks.filter(t => t.id !== task.id)
            toGroup.tasks.splice(toIndex, 0, task)

            return {
                ...state,
                board: {
                    ...state.board,
                    groups
                }
            }
        }

        case ADD_TASK_UPDATE:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: {
                    ...state.board, groups: state.board.groups.map(group => group.id === action.groupId
                        ? {
                            ...group, tasks: group.tasks.map(task => task.id === action.taskId
                                ? { ...task, updates: [action.update, ...task.updates] } : task)
                        } : group)
                },
                lastBoard
            }

        case REMOVE_TASK_UPDATE:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: {
                    ...state.board, groups: state.board.groups.map(group => group.id === action.groupId
                        ? {
                            ...group, tasks: group.tasks.map(task => task.id === action.taskId
                                ? { ...task, updates: task.updates.filter(update => update.id !== action.updateId) } : task)
                        } : group)
                },
                lastBoard
            }

        case SET_COLUMN_VALUE:
            lastBoard = { ...state.board };

            return {
                ...state,
                lastBoard,
                board: {
                    ...state.board, groups: state.board.groups.map(group => {
                        return {
                            ...group, tasks: group.tasks.map(task => {
                                if (task.id !== action.taskId) return task
                                const colExists = task.columnValues.some(cv => cv.colId === action.colId)

                                const newColumnValues = colExists
                                    ? task.columnValues.map(cv => cv.colId === action.colId ? { ...cv, value: action.value } : cv)
                                    : [...task.columnValues, { colId: action.colId, value: action.value }]
                                return { ...task, columnValues: newColumnValues }
                            })
                        }
                    })
                }
            }

        case REMOVE_COLUMN_VALUE:

            lastBoard = { ...state.board }

            return {
                ...state,
                board: {
                    ...state.board, groups: state.board.groups.map(group => {
                        return {
                            ...group, tasks: group.tasks.map(task => {
                                if (task.id !== action.taskId) return task

                                const newColumnValues = task.columnValues.filter(cv => cv.colId !== action.colId)
                                return { ...task, columnValues: newColumnValues }
                            })
                        }
                    })
                },
                lastBoard
            }

        case SET_BOARD_FILTER_BY:

            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy, person: action.filterBy.person === '' ? '' : action.filterBy.person }
            }

        //Side Nav
        case SET_BOARDS_FILTER_BY:

            return {
                ...state,
                boardsFilterBy: { txt: action.boardsFilterBy.txt }
            }

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