import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newBlog } from '../reducer/blogReducer'
import { setNotification } from '../reducer/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
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
  return(
    <div>
      {
        !visible ?
          <div>
            <Button onClick={toggleVisibility} variant="primary" id="single-button">
              Create new blog
            </Button>
          </div> :
          <div>
            <Form onSubmit={updateBlog}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="newTitle"/>
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" name="newAuthor"/>
                <Form.Label>Url</Form.Label>
                <Form.Control type="text" name="newUrl"/>
                <Form.Group className='combine-div'>
                  <Button variant='success' type="submit" id="multiple-button">Create</Button>
                  <Button onClick={toggleVisibility} variant="danger" id="multiple-button">
                    Cancel
                  </Button>
                </Form.Group>
              </Form.Group>
            </Form>
          </div>
      }
    </div>
  )
}

export default BlogForm
