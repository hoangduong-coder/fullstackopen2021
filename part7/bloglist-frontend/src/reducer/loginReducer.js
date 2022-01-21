/* eslint-disable indent */
import loginService from '../services/login'

export const handleLogin = (username, password) => {
    return async dispatch => {
        const newUser = await loginService.login({ username, password })
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))
        dispatch({
            type: 'LOG_IN',
            newUser
        })
    }
}

export const logout = () => {
    return dispatch => {
        window.localStorage.clear()
        dispatch({
            type: 'LOG_OUT'
        })
    }
}

const loginReducer = (state = 'NONE', action) => {
    switch(action.type) {
        case 'LOG_IN':
            return action.newUser
        case 'LOG_OUT':
            return null
        default:
            return state
    }
}

export default loginReducer