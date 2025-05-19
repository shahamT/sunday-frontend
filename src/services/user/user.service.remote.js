import { httpService } from '../base/http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	googleAuth,
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

async function update(boardId) {
    const loggedinUser = getLoggedinUser()
	const user = await httpService.put(`user/${loggedinUser._id}`, { boardId })

	// When admin updates other user's details, do not update loggedinUser
    // if (loggedinUser._id === user._id && loggedinUser.role !== 'admin') 
    saveLoggedinUser(user)

	return user
}

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred)
	if (user) saveLoggedinUser(user)
	return user
}

async function signup(userCred) {
        const user = await httpService.post('auth/signup', userCred)
	return saveLoggedinUser(user)
}

async function googleAuth(idToken) {
	console.log("idToken: ", idToken)
        // const user = await httpService.post('auth/google', userCred)
	// return saveLoggedinUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
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
        profileImg: user.imgUrl, 
        lastViewedBoards: user.lastViewedBoards,
		account: user.account,
		profileImg: user.profileImg || `https://cdn1.monday.com/dapulse_default_photo.png`
    }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}
