const notificationReducer = (state = 'NONE', action) => {
    switch(action.type) {
        case 'NOTIFICATION':
            return action.content
        case 'REMOVE':
            return null
        default:
            return state
    }
}   

export const setNotification = (content, time) => {
    window.clearTimeout(window.timeOut)
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            content
        })
        window.timeOut = setTimeout(
            () => dispatch({ type: 'REMOVE' }), time*1000)
    }
}

export default notificationReducer