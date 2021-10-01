import React from 'react'
import { makeStyles } from '@mui/styles'
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { setSelectedGroup } from 'actions/groupActions'
import { addUserGroup } from 'actions/profileActions'
import { avatarSrc } from 'helpers.js'
import { AddCircle as AddCircleIcon } from '@mui/icons-material'
import { useAuth } from 'contexts/AuthContext'

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
  },
  addButton: {
    marginLeft: 'auto',
    alignSelf: 'center',
  },
  icon: {
    color: "#05e254",
  }
}))

const MessageGroup = (props) => {
  const classes = useStyles()
  
  const { id, lastMessage, name, selected, selectable, showAdd } = props
  const { currentUser } = useAuth()
  
  const handleSelectClick = () => {
    if (id && selectable)
      props.setSelectedGroup(id)
  }
  
  return (
    <div 
      className={selected ? `${classes.container} ${classes.selected}` : classes.container}
      onClick={handleSelectClick}
    >
      <Avatar src={avatarSrc(lastMessage.username)}/>
      
      <div className={classes.infoContainer}>
        
        <Typography className={classes.groupName}>
          {name}
        </Typography>
        <Typography className={classes.lastMessage}>
          {lastMessage.content}
        </Typography>

      </div>

      <div className={classes.addButton} hidden={!showAdd} >
        <Tooltip title="Add Group">
          <IconButton onClick={() => addUserGroup(id, currentUser.uid)}>
            <AddCircleIcon className={classes.icon} fontSize="large"/>
          </IconButton>
        </Tooltip>
      
      </div> 

    </div>
  )
}

MessageGroup.defaultProps = {
  name: 'Default',
  id: null,
  lastMessage: {
    timestamp: {seconds: 1632740700, nanoseconds: 0},
    content: "Add groups via searchbar",
    uid: null,
    username: 'Default'
  },
  selected: false,
  selectable: false,
  showAdd: false,
}


export default connect(null, {setSelectedGroup})(MessageGroup)
