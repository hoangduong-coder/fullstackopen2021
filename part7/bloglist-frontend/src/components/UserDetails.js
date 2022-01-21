import React from "react"
import { useParams } from 'react-router-dom'

const UserDetails = ({ users }) => {
  const id = useParams().id
  const user = users.find(obj => obj.id === id)
  if (!user) {
    return null
  }
  return(
    <div>
      <h2>{user.name}</h2>
      <h2>Blog list</h2>
      <ul>
        {
          user.blogs.map(
            obj => <li key={obj.id}>{obj.title}</li>
          )
        }
      </ul>
    </div>
  )
}

export default UserDetails