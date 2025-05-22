import { userService } from '../../services/user'
import { socketService } from '../../services/base/socket.service.js'
import { store } from '../store'

import { showErrorMsg } from '../../services/base/event-bus.service.js'
import { REMOVE_USER, SET_USER, SET_USERS, UPDATE_LAST_VISITED, USERS_LOADING_DONE, USERS_LOADING_START } from '../../store/reducers/user.reducer'

export async function loadUsers() {
    try {
        store.dispatch({ type: USERS_LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
        return users
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: USERS_LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function loginUser(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function googleAuth(idToken){
 try {
        const user = await userService.googleAuth(idToken)
        console.log("user: ", user)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signupUser(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function updateUser(boardId) {
    try {
        store.dispatch({ type: UPDATE_LAST_VISITED, boardId })
        const user = await userService.update(boardId)
        return user
    } catch (err) {
        showErrorMsg('Cannot update user')
        console.log('Cannot update user', err)
    }
}