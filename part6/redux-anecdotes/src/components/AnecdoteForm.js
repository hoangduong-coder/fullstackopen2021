import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificaitonReducer'
import { createAnecdotes } from '../reducers/anecdoteReducer'
const AnecdotesForm = (props) => {
    const newAnecdotes = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        props.handleAction(content)
    }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdotes}>
                <div>
                    <input name='newAnecdote'/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        handleAction: value => {
            dispatch(createAnecdotes(value))
            dispatch(setNotification(`Added ${value} successfully!`, 5))    
        }
    }
}

export default connect(null, mapDispatchToProps)(AnecdotesForm)