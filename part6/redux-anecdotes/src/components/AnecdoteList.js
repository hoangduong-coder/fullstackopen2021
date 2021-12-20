import React from "react"
import {connect} from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificaitonReducer"

const Item = ({anecdote, handleClick}) => {
    return(
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}
const AnecdoteList = (props) => {
    const action = (obj) => {
        props.vote(obj.id)
        props.setNotification(`You voted ${obj.content}`, 5)
    }
    return(
        <div>
            {props.anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote => 
                    <Item anecdote={anecdote} key={anecdote.id} handleClick={() => action(anecdote)} />
                )
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    if(state.filter !== null && state.filter.trim() !== '') {
        return {
            anecdotes: state.anecdotes.filter(obj => obj.content.toLowerCase().includes(state.filter.toLowerCase()))
        }
    }
    return {
        anecdotes: state.anecdotes
    }
}
const mapDispatchToProps = { vote, setNotification }

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)