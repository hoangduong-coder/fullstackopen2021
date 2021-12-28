import React from "react"
import {BrowserRouter as useParams} from 'react-router-dom';

export const Anecdote = ({ anecdotesList }) => {
  const id = useParams().id
  const anecdote = anecdotesList.find(obj => obj.id === id)
  return(
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>
        <b>Votes: </b>
        {anecdote.votes}
      </p>
      <p>
        For more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}