import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
  message: {
    position: 'relative',
    fontSize: '16px',
    padding: '10px',
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: 'white',
    marginBottom: '30px'
  },
  messageName: {
    position: 'absolute',
    top: '-15px',
    fontWeight: '800',
    fontSize: 'xx-small'
  },
  messageTS: {
    marginLeft: '10px',
    fontSize: 'xx-small'
  },
  sent: {
    marginLeft: 'auto',
    backgroundColor: '#05e254' // light green
  }
}))

const Message = (props) => {
  
  const classes = useStyles()
  const {mName, mContent, mTimestamp, sent} = props
  
  return (
    <p className={sent ? [classes.message, classes.sent].join(' ') : classes.message}>
      
      <span className={classes.messageName}>
        {mName}
      </span>
      
      {mContent}
      
      <span className={classes.messageTS}>
        {mTimestamp}
      </span>
    </p>
  )
}

Message.defaultProps = {
  mTimestamp: new Date().toUTCString(),
  mContent: "Lorem ipsum dolor sit amet",
  mName: 'John Doe',
  sent: false
}

export default Message
