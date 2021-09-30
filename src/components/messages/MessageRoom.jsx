import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState, useEffect } from 'react'
import Message from 'components/messages/Message'
import MessageForm from 'components/messages/MessageForm'
import { connect } from 'react-redux'

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
  const [messages, setMessages] = useState([])

  const { groups, selectedGroup } = props
  const group = groups.find(g => g.id === selectedGroup)
  
  useEffect(() => {
    setMessages(group?.messages || [])
  }, [group])
  
  const renderMessages = (messages) => {
    return messages.map((message, i) => (
      <Message
        key={i}
        username={message.username}
        content={message.content}
        timestamp={message.timestamp}
        uid={message.uid}
      />
    ))  
  }

  return (
    <Box className={classes.box}>
      
      <div className={classes.header}>
        I am MR
      </div>
      
      <div className={classes.body}>
        {renderMessages(messages)}
      </div>
      
      <div className={classes.footer}>
       <MessageForm />
      </div>
    
    </Box>
  )
}

MessageRoom.defaultProps = {
  selectedGroup: null,
  groups: []
}

const mapStateToProps = state => ({
  selectedGroup: state.selectedGroup,
  groups: state.groups
})

export default connect(mapStateToProps, null)(MessageRoom)
