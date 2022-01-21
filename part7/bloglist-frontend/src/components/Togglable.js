/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

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
                <Button onClick={toggleVisibility} variant="primary">
                    {props.buttonName}
                </Button>
            </div>
            <div style={showObject} className='hideDefault'>
                {props.children}
                <Button onClick={toggleVisibility} variant="primary"> 
                    {props.stopName}
                </Button>
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