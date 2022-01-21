/* eslint-disable quotes */
import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
const Notification = () => {
  const message = useSelector(state => {
    return (state.notification !== null || state.notification !== "NONE")
      ? state.notification
      : null
  })
  const style = {
    display: message ? 'none' : ''
  }
  return(
    <div className='container' style={style}>
      <Alert variant='success'>
        {message}
      </Alert>
    </div>
  )
}

export default Notification