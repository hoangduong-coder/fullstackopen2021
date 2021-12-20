const filterReducer = (state = 'ALL', action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.keyword
        default:
            return null
    }
}
export const filterChange = keyword => {
    return {
        type: 'SET_FILTER',
        keyword
    }
}
export default filterReducer