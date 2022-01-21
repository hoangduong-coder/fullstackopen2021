/* eslint-disable indent */
import userService from '../services/user'

export const initUserList = () => {
    return async dispatch => {
        const userList = await userService.getAll()
        dispatch({
            type: 'INIT_USER',
            userList
        })
    }
}

const userReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_USER':
            return action.userList
        default:
            return state
    }
}

export default userReducer