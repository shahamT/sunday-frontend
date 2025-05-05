import { authService } from "../../services/base/auth.service.js";


//* User
export const SET_USER = 'SET_USER'

const initialState = {
    loggedInUser: authService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
       
        default: return state;
    }
}