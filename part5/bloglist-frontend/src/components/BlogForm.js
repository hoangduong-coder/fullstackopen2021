import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleChange = (event) => {
    switch(event.target.name){
    case 'Title':
      setTitle(event.target.value)
      break
    case 'Author':
      setAuthor(event.target.value)
      break
    case 'Url':
      setUrl(event.target.value)
      break
    default:
      break
    }
  }
  const updateBlog = async event => {
    event.preventDefault()
    handleBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='blogFormDiv'>
      <form onSubmit={updateBlog}>
        <div>
          <span>Title </span>
          <input id="title" type="text" value={title} name="Title" onChange={handleChange}/>
        </div>
        <div>
          <span>Author </span>
          <input id="author" type="text" value={author} name="Author" onChange={handleChange}/>
        </div>
        <div>
          <span>Url </span>
          <input id="url" type="text" value={url} name="Url" onChange={handleChange} />
        </div>
        <button id="createBlogButton" type="submit">Create</button>
      </form>
    </div>
  )
}
BlogForm.propTypes = {
  handleBlog: PropTypes.func.isRequired
}

export default BlogForm
