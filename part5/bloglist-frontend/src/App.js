import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(thisblog =>
      setBlogs( thisblog )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      setUser(newUser)
      blogService.setToken(newUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const newUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      changeNoti('Wrong username or password','error')
    }
  }

  const handleChange = (event) => {
    switch(event.target.name){
    case 'Username':
      setUsername(event.target.value)
      break
    case 'Password':
      setPassword(event.target.value)
      break
    default:
      break
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleAddBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(newBlog))
      changeNoti(`Add ${newBlog.title} (${newBlog.author}) successfully!`,'sucess')
    } catch (exception) {
      changeNoti('Something wrong in your input', 'error')
    }
  }

  const changeNoti = (mess, type) => {
    setNotification({
      message: mess,
      type: type
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonName="Create new blog" stopName="Cancel">
      <BlogForm handleBlog={handleAddBlog}/>
    </Togglable>
  )

  const handleUpdate = async (blogId, blogObject) => {
    try{
      const newBlog = await blogService.update(blogId, blogObject)
      setBlogs(blogs.map(blog => (blog.id !== newBlog.id ? blog : newBlog)))
    } catch(exception) {
      changeNoti('Update failed', 'error')
    }
  }

  const handleDelete = async (blog) => {
    try{
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(obj => obj.id !== blog.id))
      changeNoti(`Delete ${blog.title} (${blog.author}) successfully!`,'sucess')
    } catch (exception) {
      changeNoti('Something wrong in your input', 'error')
    }
  }

  return (
    <div>
      {notification && <Notification noti={notification}/>}
      {
        (user === null) ?
          <LoginForm changeAction={handleChange} submitAction={handleLogin} username={username} password={password} /> :
          <div>
            <h2>Blogs</h2>
            <span>{user.name} has logged in</span>
            <button onClick={handleLogout}>Log out</button>
            {blogForm()}
            {
              blogs
                .sort((a,b) => b.likes - a.likes)
                .map(blog => <Blog key={blog.id} blog={blog} userData={user} updateAction={handleUpdate} deleteAction={() => handleDelete(blog)}/>)
            }
          </div>
      }
    </div>
  )
}

export default App