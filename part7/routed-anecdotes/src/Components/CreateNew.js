import React from "react"
import { useField } from '../hooks'

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField('text', 'content')
  const { reset: resetAuthor, ...author } = useField('text','author')
  const { reset: resetInfo, ...info } = useField('text','info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      'content': content.value,
      'author': author.value,
      'info': info.value,
      votes: 0
    })
  }

  const handleReset = () => {
      resetContent('')
      resetAuthor('')
      resetInfo('')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content <input {...content}/>
        </div>
        <div>
          author <input {...author}/>
        </div>
        <div>
          url for more info <input {...info}/>
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

export default CreateNew