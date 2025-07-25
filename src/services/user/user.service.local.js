import { storageService } from '../base/async-storage.service'
import testUsers from '../../../data-examples/users.json'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USERS = 'UsersDB'

_createUsers()

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}

async function getUsers() {
    const users = await storageService.query(STORAGE_KEY_USERS)
    const miniUsers = users.map(({ _id, account, firstName, lastName, email, profileImg }) => ({ _id, account, firstName, lastName, email, profileImg }))
    return miniUsers
}

async function getById(userId) {
    const {_id, account, firstName, lastName, email, profileImg} = await storageService.get(STORAGE_KEY_USERS, userId) 
    return {_id, account, firstName, lastName, email, profileImg}
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY_USERS, userId)
}

async function update({ _id, visitedBoardId }) {
    const user = await storageService.get(STORAGE_KEY_USERS, _id)
    user.lastViewedBoards = user.lastViewedBoards.filter(boardId => boardId !== visitedBoardId)
    user.lastViewedBoards.unshift(boardId)
    await storageService.put('user', user)

    return user
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY_USERS)
    const user = users.find(user => user.email === userCred.email)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.profileImg) userCred.profileImg = `https://ui-avatars.com/api/?name=${userCred.firstName}+${userCred.lastName}&background=0D8ABC&color=fff&length=2&rounded=true&bold=true`

    const user = await storageService.post('user', userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	user = { 
        _id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        imgUrl: user.imgUrl, 
        lastViewedBoards: user.lastViewedBoards,
        role: user.role 
    }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

async function _createUsers() {
    const users = await storageService.query(STORAGE_KEY_USERS)
    if (!users || !users.length) {
        for (const item of testUsers) {
            await storageService.post(STORAGE_KEY_USERS, item)
        }
    }
}