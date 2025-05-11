
export const userService = {
    query,
    getById,
    getEmptyCredentials,
}

// ===========================================================================
// ============================ REMOTE FUNCTIONS =============================
// ===========================================================================
// ========================= (local functions below) =========================
// ===========================================================================
// ========================= (synced functions below) ========================
// ===========================================================================


const BASE_URL = '/api/user/'

function query() {
    return axios.get(BASE_URL)
        .then(res => res.data)
}

function getById(userId) {
    return axios.get(BASE_URL + userId)
        .then(res => res.data)
}



// ===========================================================================
// ============================ LOCAL FUNCTIONS ==============================
// ===========================================================================
// ========================= (synced functions below) ========================
// ===========================================================================

// const USER_KEY = 'userDB'

// _createUsers()

// function query() {
//     return storageService.query(USER_KEY)
// }

// function getById(userId) {
//     return storageService.get(USER_KEY, userId)
// }


// function _createUsers() {
//     let users = loadFromStorage(USER_KEY)
//     if (!users || !users.length) {
//         users = [
//             {
//                 "_id": "u10000",
//                 "username": "admin",
//                 "fullname": "Admin Adminov",
//                 "password": "admin",
//                 "score": 100,
//                 "isAdmin": true
//             }
        
//         ]
//         saveToStorage(USER_KEY, users)
//     }
// }

// ===========================================================================
// ============================ SYNCED FUNCTIONS =============================
// ===========================================================================


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}
