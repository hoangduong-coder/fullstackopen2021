import React from "react"
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  return(
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Number of blogs</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(obj =>
              <tr key={obj.id}>
                <td>
                  <Link to={`/users/${obj.id}`}>{obj.name}</Link>
                </td>
                <td>{obj.blogs.length}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Users