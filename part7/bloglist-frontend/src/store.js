/* eslint-disable indent */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducer/blogReducer'
import userReducer from './reducer/userReducer'
import notificationReducer from './reducer/notificationReducer'
import loginReducer from './reducer/loginReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    loginUser: loginReducer,
    users: userReducer,
    notification: notificationReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)
console.log(store.getState())
export default store