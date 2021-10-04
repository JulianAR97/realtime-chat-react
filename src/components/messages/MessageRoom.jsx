import React, { useState, useEffect, useRef } from 'react'
import { Avatar, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Message from 'components/messages/Message'
import MessageForm from 'components/messages/MessageForm'
import { connect } from 'react-redux'
import { avatarSrc, timestampToString } from 'helpers.js';

const useStyles = makeStyles(theme => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0.7,
    minWidth: '100px',
    minHeight: '100px',
    backgroundColor: 'white'
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px'
  },
  contentText: {
    margin: '5px'
  }


}))

const MessageRoom = (props) => {
  const classes = useStyles()
  const [messages, setMessages] = useState([])
  const [headData, setHeadData] = useState({lastSeen: '', name: 'Default', avatar: avatarSrc('Default')})
  const bottom = useRef(null)

  const { groups, selectedGroup } = props
  const group = groups.find(g => g.id === selectedGroup)
  
  // update messages when group changes
  useEffect(() => {
    setMessages(group?.messages || [])
  }, [group])
  
  useEffect(() => {
    if (group) {
      let { name, messages } = group
      let lastMessage = messages[messages.length - 1]
      
      setHeadData({
        lastSeen: timestampToString(lastMessage.timestamp),
        name,
        avatar: avatarSrc(lastMessage.username)
      })
    }
  }, [group])

  // scrolls to ref which is at the bottom of the messages
  const scrollToBottom = () => bottom.current.scrollIntoView({behavior: 'smooth'})
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
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


  const renderHead = () => {
    
    return (
      <>
        <Avatar src={headData.avatar} />
        <div className={classes.content}>
          <div className={classes.contentText}>
            <h3>{headData.name}</h3>
          </div>
          <div className={classes.contentText}>
            <h4>Last Seen at {headData.lastSeen}</h4>
          </div>

        </div>
      </>
    )
  }

  return (
    <Box id="messageRoom" className={classes.box}>
      
      <div className={classes.header}>
        {renderHead()}
      </div>
      
      <div className={classes.body}>
        {renderMessages(messages)}
        <div ref={bottom}></div>
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
