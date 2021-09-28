import React from 'react'
import { makeStyles } from '@mui/styles'
import { Avatar, Typography } from '@mui/material'

const useStyles = makeStyles(theme => ({
  container:  {
    borderBottom: '1px solid #f6f6f6',
    cursor: 'pointer',
    display: 'flex',
    marginBottom: '8px',
    padding: '20px',
    '&:hover': {
      backgroundColor: 'lightgrey',
    },
  },
  groupName: {
    fontSize: '16px !important',
    fontWeight: '800 !important'
  },
  lastMessage: {
    fontSize: '14px !important',
  },
  infoContainer: {
    marginLeft: '15px',
  },
  selected: {
    backgroundColor: 'lightgrey'
  }
}))

const MessageGroup = (props) => {
  const classes = useStyles()
  
  const { lastMessage, handleGroupSelect, name, id, selectedGroup } = props
  
  const avatarSrc = () => {
    // John Smith => JS e.g.
    let slug = lastMessage.username.split(' ').slice(0, 2).map(x => x[0]).join('')
    
    return `https://avatars.dicebear.com/api/initials/${slug}.svg`
  }

  const selected = selectedGroup === id
  
  return (
    <div className={selected ? `${classes.container} ${classes.selected}` : classes.container} onClick={() => handleGroupSelect(id)} selected>
      <Avatar src={avatarSrc()}/>
      <div className={classes.infoContainer}>
        <Typography className={classes.groupName}>
          {name}
        </Typography>
        <Typography className={classes.lastMessage}>
          {lastMessage.content}
        </Typography>
      </div>
    </div>
  )
}

MessageGroup.defaultProps = {
  name: 'Default',
  lastMessage: {
    content: 'Search Rooms to get started',
    username: 'Default'
  }
}

export default MessageGroup
