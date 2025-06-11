import { userService } from "../../services/user";


//* User
export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const UPDATE_LAST_VISITED = 'UPDATE_LAST_VISITED'

//loading
export const USERS_LOADING_START = 'USERS_LOADING_START'
export const USERS_LOADING_DONE = 'USERS_LOADING_DONE'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    users: [],
    isUsersLoading: false
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loggedinUser: action.user
            }

        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }

        case SET_USERS:
            return { ...state, users: action.users }

        case UPDATE_LAST_VISITED:
            return {
                ...state,
                loggedinUser: {...state.loggedinUser, lastViewedBoards: [{ boardId: action.boardId, viewedAt: Date.now() }, ...state.loggedinUser.lastViewedBoards.filter(b => b.boardId !== action.boardId)]}
            }

        //Loading

        case USERS_LOADING_START:
            return { ...state, isUsersLoading: true }
    
        case USERS_LOADING_DONE:
            return { ...state, isUsersLoading: false }
       
        default: return state;
    }
}