import React from "react"
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import About from './About'
import { Anecdote } from './Anecdotes'
import { AnecdoteList } from './AnecdotesList'
import CreateNew from './CreateNew'

const Menu = ({ anecdotes, addNew, newAnecdote }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
      <div>
        <Link style={padding} to="/">Anecdotes</Link>
        <Link style={padding} to="/create">Create new</Link>
        <Link style={padding} to="/about">About</Link>
      </div>
      <Switch>
        <Route path="/create">
          {newAnecdote ? <Redirect to="/" /> : <CreateNew addNew={addNew}/>}
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotesList={anecdotes}/>
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default Menu