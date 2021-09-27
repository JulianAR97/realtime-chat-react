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
    backgroundColor: 'lightgreen'
  }
}))

const Message = (props) => {
  
  const classes = useStyles()
  const {messageName, messageContent, messageTimestamp, sent} = props
  
  return (
    <p className={sent ? [classes.message, classes.sent].join(' ') : classes.message}>
      
      <span className={classes.messageName}>
        {messageName}
      </span>
      
      {messageContent}
      
      <span className={classes.messageTS}>
        {messageTimestamp}
      </span>
    </p>
  )
}

Message.defaultProps = {
  messageTimestamp: new Date().toUTCString(),
  messageContent: "Lorem ipsum dolor sit amet",
  messageName: 'John Doe',
  sent: false
}

export default Message
