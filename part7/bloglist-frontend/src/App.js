import React, { useEffect } from 'react'
import Notification from './components/Notification'
import HomePage from './components/HomePage'
import { useDispatch } from 'react-redux'
import { initializeBlog } from './reducer/blogReducer'
import blogService from './services/blogs'
import { initUserList } from './reducer/userReducer'
import './index.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      blogService.setToken(newUser.token)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUserList())
  }, [dispatch])

  return (
    <div className="container">
      <Notification/>
      <HomePage/>
    </div>
  )
}

export default App