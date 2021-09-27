import { Box, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Send as SendIcon } from '@mui/icons-material'
import React from 'react'
import Message from './Message'

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
  messageForm: {
    display: 'flex',
    flex: 1,
  },
  messageInput: {
    flex: 1,
    borderRadius: '30px',
    padding: '10px',
    border: 'none',
    outline: 'none'
  },
  messageSendButton: {
    display: 'none'
  }

}))

const MessageRoom = (props) => {
  const classes = useStyles()
  
  const renderMessages = (messages) => {
    return messages.map((message, i) => (
      <Message
        key={i}
        mName={message.mName}
        mContent={message.mContent}
        sent={message.sent}
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
        <form className={classes.messageForm}>
          <input
            className={classes.messageInput} 
            placeholder="Enter message..." 
            type="text"
          />
          <IconButton>
            <SendIcon />
          </IconButton>
        </form>
      </div>
    </Box>
  )
}

MessageRoom.defaultProps = {
  messages: [
    {
      mName: 'John Doe',
      mContent: 'Hello World',
      sent: false
    },
    {
      mName: 'Jane Doe',
      mContent: 'Goodbye World',
      sent: true
    }
  ]
}

export default MessageRoom
