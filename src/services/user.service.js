import { httpService } from "./http.service"

const AUTH_URL = 'auth/'
const USER_URL = 'user/'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getEmptyCredentials,

    getById,
    updateScore,
}

function login({ username, password }) {

    return httpService.post(AUTH_URL + 'login', { username, password })
        .then(user => {
            console.log('user FETCH:', user)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    return httpService.post(AUTH_URL + 'signup', user)
        .then(user => {
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid signup')
        })
}

function logout() {
    return httpService.post(AUTH_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}

function updateScore(diff) {
    if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
    return axios.put(USER_URL, { diff })
        .then(user => {
            console.log('updateScore user:', user)
            _setLoggedinUser(user)
            return user.score
        })
}

function getById(userId) {
    return axios.get(USER_URL + userId)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



