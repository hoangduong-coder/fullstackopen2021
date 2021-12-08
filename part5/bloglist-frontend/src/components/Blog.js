import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, userData, updateAction, deleteAction }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const updateLike = (blogObject) => {
    const newBlog = {
      url: blogObject.url,
      author: blogObject.author,
      title: blogObject.title,
      likes: blogObject.likes + 1
    }
    updateAction(blogObject.id, newBlog)
  }

  return (
    <div style={blogStyle} className='newBlog'>
      <p><b>{blog.title}</b> - {blog.author}</p>
      <Togglable buttonName="View more" stopName="Hide">
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => updateLike(blog)} className='likeButton'>Like</button>
          <p>{userData.name}</p>
          {
            (blog.user !== undefined) && <button className='deleteButton' onClick={deleteAction}>Remove</button>
          }
        </div>
      </Togglable>
    </div>
  )
}
export default Blog
