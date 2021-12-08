import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ changeAction, submitAction, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={submitAction}>
        <div>
          <span>Username </span>
          <input id="username" type="text" value={username} name="Username" onChange={changeAction}/>
        </div>
        <div>
          <span>Password </span>
          <input id="password" type="password" value={password} name="Password" onChange={changeAction}/>
        </div>
        <button id="loginButton" type="submit">Log in</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  changeAction: PropTypes.func.isRequired,
  submitAction: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm
