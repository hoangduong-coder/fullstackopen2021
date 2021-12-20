import anecdoteService from '../services/anecdotes'
export const createAnecdotes = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTES',
      newAnecdote
    })
  }
}

export const vote = (id) => {
  return async dispatch => {
    const votingAnecdote = await anecdoteService.update(id)
    dispatch({
      type: 'VOTE',
      votingAnecdote
    })
  }
}

export const initAnecdote = () => {
  return async dispatch  => {
    const anecdote = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case "VOTE": {
      return state.map(anecdotes => anecdotes.id !== action.votingAnecdote.id ? anecdotes : action.votingAnecdote)
    }
    case "NEW_ANECDOTES": {
      return [...state, action.newAnecdote]
    }
    case "INIT_ANECDOTES": {
      return action.anecdote
    }
    default:
      return state
  }
}

export default anecdoteReducer