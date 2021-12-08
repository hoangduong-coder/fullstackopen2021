import React from 'react'
const Notification = ({ noti }) => {
  return(
    <div className={noti.type}>
      {noti.message}
    </div>
  )
}
export default Notification