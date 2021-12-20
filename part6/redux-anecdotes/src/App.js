import React, {useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdotesForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdote())
  }, [dispatch])
  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdoteList/>
      <AnecdotesForm/>
    </div>
  )
}

export default App