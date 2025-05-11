import { userService } from "../user"
import { SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export function login(credentials) {
    console.log('credentials:', credentials)
    return userService.login(credentials)
        .then((user) => {
            console.log('user login:', user)
            store.dispatch({ type: SET_USER, user })
        })
        .catch((err) => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then((user) => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch((err) => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}

export function logout(credentials) {
    return userService.logout(credentials)
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
        })
}
