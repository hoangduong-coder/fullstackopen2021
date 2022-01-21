import React from 'react'
import { useDispatch } from 'react-redux'
import { newBlog } from '../reducer/blogReducer'
import { setNotification } from '../reducer/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()
  const updateBlog = async event => {
    event.preventDefault()
    const thisBlog = {
      title: event.target.newTitle.value,
      author: event.target.newAuthor.value,
      url: event.target.newUrl.value
    }
    event.target.newTitle.value = ''
    event.target.newAuthor.value = ''
    event.target.newUrl.value = ''
    dispatch(newBlog(thisBlog))
    dispatch(setNotification(`Add ${thisBlog.title} (${thisBlog.author}) successfully!`, 5))
  }

  return (
    <div>
      <Form onSubmit={updateBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="newTitle"/>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="newAuthor"/>
          <Form.Label>Url</Form.Label>
          <Form.Control type="text" name="newUrl"/>
          <Button variant='success' type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
