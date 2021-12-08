/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line no-unused-vars
const Togglable = React.forwardRef((props, _ref) => { 
    const [visible, setVisible] = useState(false)

    const hideObject = { display: visible ? 'none' : '' }
    const showObject = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return(
        <div>
            <div style={hideObject} className='showDefault'>
                <button onClick={toggleVisibility}>{props.buttonName}</button>
            </div>
            <div style={showObject} className='hideDefault'>
                {props.children}
                <button onClick={toggleVisibility}>{props.stopName}</button>
        </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'


Togglable.propTypes = {
  buttonName: PropTypes.string.isRequired,
  stopName: PropTypes.string.isRequired,
}

export default Togglable