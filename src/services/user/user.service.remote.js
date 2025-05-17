import { httpService } from '../base/http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

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

function getUsers() {
	return httpService.get(`user`) //mini users
}

async function getById(userId) {
	const user = await httpService.get(`user/${userId}`)//mini user 
	return user
}

function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update({ boardId }) {
    const loggedinUserId = getLoggedinUser()._id
	const user = await httpService.put(`user/${loggedinUserId}`, { boardId })

	// When admin updates other user's details, do not update loggedinUser
    // if (loggedinUser._id === user._id && loggedinUser.role !== 'admin') 
    saveLoggedinUser(user)

	return user
}

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred)
	return user ? saveLoggedinUser(user) : null
}

async function signup(userCred) {
        const user = await httpService.post('auth/signup', userCred)
	return saveLoggedinUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

function getLoggedinUser() { //TODO change this from hardcoded user back to service
	    return {
    _id: "rL2Yi",
    account: "acc001",
    firstName: "John",
    lastName: "Doe",
    email: "user1@company.com",
    lastViewedBoards: [],
    profileImg: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&length=2&rounded=true&bold=true",
  }
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
	user = { 
        _id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        profileImg: user.imgUrl, 
        lastViewedBoards: user.lastViewedBoards,
    }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}
