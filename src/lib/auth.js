const AUTH_STORAGE_KEY = 'channelS_admin_auth'
const ADMIN_USERNAME = 'dev'
const ADMIN_PASSWORD = 'pro1bro1'

export function loginAdmin(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true')
        return true
    }

    return false
}

export function logoutAdmin() {
    sessionStorage.removeItem(AUTH_STORAGE_KEY)
}

export function isAdminLoggedIn() {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export function getAdminCredentialsHint() {
    return {
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
    }
}
