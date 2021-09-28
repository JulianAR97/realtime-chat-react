import { makeStyles } from '@mui/styles'
import React from 'react'
import { useAuth } from 'contexts/AuthContext'

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
  const {username, content, timestamp, uid} = props
  const {currentUser} = useAuth()
  
  console.log(currentUser.uid)
  console.log(uid)
  console.log(username)
  
  return (
    
    <p className={currentUser.uid === uid ? `${classes.message} ${classes.sent}` : classes.message}>
      
      <span className={classes.messageName}>
        {username}
      </span>
      
      {content}
      
      <span className={classes.messageTS}>
        {new Date(timestamp.seconds).toLocaleString()}
      </span>
    </p>
  )
}

Message.defaultProps = {
  timestamp: new Date().toLocaleString(),
  content: "Lorem ipsum dolor sit amet",
  username: 'John Doe',
  uid: '123456'
}

export default Message
