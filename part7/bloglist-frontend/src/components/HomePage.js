import React from 'react'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import LoginForm from './LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducer/loginReducer'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import Users from './Users'
import UserDetails from './UserDetails'
import Blog from './Blog'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

const HomePage = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => (state.loginUser !== null && state.loginUser !== 'NONE') ? state.loginUser : null)
  const blogList = useSelector(state => state.blogs)
  const userList = useSelector(state => state.users)
  const logoutService = () => {
    dispatch(logout())
  }
  return(
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <h2>Blogs</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='me-auto'>
              <Nav.Link href='#' as="span">
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link href='#' as="span">
                <Link to="/users">Users</Link>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href='#' as="span">
                {
                  loginUser ?
                    <Navbar.Collapse>
                      <Navbar.Text>{loginUser.name} has logged in</Navbar.Text>
                      <Button onClick={() => logoutService()} variant="outline-light" id="multiple-button">
                        Log out
                      </Button>
                    </Navbar.Collapse>
                    : <Link to="/login">Login</Link>
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        loginUser && <BlogForm/>
      }
      <Switch>
        <Route path="/users/:id">
          <UserDetails users={userList}/>
        </Route>
        <Route path="/users">
          {
            loginUser
              ? <Users users={userList}/>
              : <Redirect to="/login"/>
          }
        </Route>
        <Route path="/blogs/:id">
          <Blog blogs={blogList} loginUser={loginUser}/>
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/">
          <BlogList blogs={blogList}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default HomePage