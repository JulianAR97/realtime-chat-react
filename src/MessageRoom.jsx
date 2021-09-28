import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Message from './Message'
import MessageForm from './MessageForm'

const useStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0.7,
  },
  body: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: '30px',
    overflow: 'scroll',
  },
  header: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid lightgrey'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '62px',
    borderTop: '1px solid lightgrey',
    backgroundColor: 'lightgrey',
    padding: '10px'
  },


}))

const MessageRoom = (props) => {
  const classes = useStyles()
  
  const renderMessages = (messages) => {
    return messages.map((message, i) => (
      <Message
        key={i}
        username={message.name}
        content={message.content}
        timestamp={message.timestamp}
        userID={message.userID}
      />
    ))  
  }

  return (
    <Box className={classes.box}>
      <div className={classes.header}>
        I am MR
      </div>
      <div className={classes.body}>
        {renderMessages(props.messages)}
      </div>
      <div className={classes.footer}>
       <MessageForm />
      </div>
    </Box>
  )
}

MessageRoom.defaultProps = {
  messages: []
}

export default MessageRoom
