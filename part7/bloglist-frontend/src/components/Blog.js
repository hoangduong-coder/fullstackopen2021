import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducer/blogReducer'
import { setNotification } from '../reducer/notificationReducer'

const Blog = ({ blogs, loginUser }) => {
  const dispatch = useDispatch()
  const like = (obj) => {
    dispatch(likeBlog(obj))
  }
  const clearBlog = (obj) => {
    dispatch(deleteBlog(obj))
    dispatch(setNotification(`Delete ${obj.title} (${obj.author}) successfully!`, 5))
  }
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  if (!blog) {
    return null
  }
  return (
    <div className='newBlog'>
      <h2>{blog.title} - {blog.author}</h2>
      <p>Link: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <button onClick={() => like(blog)}>Like</button>
      <p>{loginUser.name}</p>
      {
        (blog.user !== undefined) && <button onClick={() => clearBlog(blog)}>Remove</button>
      }
    </div>
  )
}

export default Blog
