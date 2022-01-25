import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducer/blogReducer'
import { setNotification } from '../reducer/notificationReducer'
import { Form, Button } from 'react-bootstrap'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const CommentForm = ({ action }) => {
  return(
    <Form onSubmit={action}>
      <Form.Group>
        <Form.Control type='text' name='comment'/>
        <Button variant='success' type="submit" id="single-button">Add comment</Button>
      </Form.Group>
    </Form>
  )
}

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
  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(commentBlog(blog, { comment }))
    event.target.comment.value = ''
  }
  return (
    <div className='newBlog'>
      <h2>{blog.title} - {blog.author}</h2>
      <p>Link: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <p>Upload by {blog.user.name}</p>
      <Button id="button-combined" variant="primary" onClick={() => like(blog)}>
        <ThumbUpIcon id='icon'/>
        Like
      </Button>
      <h2>Comments</h2>
      {
        loginUser && <CommentForm action={addComment}/>
      }
      <ul>
        {
          blog.comment.length > 0
            ?  blog.comment.map((obj,index) => <li key={index}>{obj}</li>)
            : <li>No comment for this post</li>
        }
      </ul>
      {
        (blog.user !== undefined) && <Button variant='danger' onClick={() => clearBlog(blog)}>Remove</Button>
      }
    </div>
  )
}

export default Blog
