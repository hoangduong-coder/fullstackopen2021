import React from 'react'
import { handleLogin } from '../reducer/loginReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    event.target.Username.value = ''
    const password = event.target.Password.value
    event.target.Password.value = ''
    dispatch(handleLogin(username, password))
    history.push('/')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="Username"/>
          <Form.Label>Password </Form.Label>
          <Form.Control type="password" name="Password"/>
          <Button variant='primary' type="submit">
            Log in
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
