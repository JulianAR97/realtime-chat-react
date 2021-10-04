import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { incrementGroupUsers, setSelectedGroup } from 'actions/groupActions'
import { addUserGroup, removeUserGroup } from 'actions/profileActions'
import { avatarSrc, getLastSeen } from 'helpers.js'
import { AddCircle as AddCircleIcon, HighlightOff as ExitIcon, People as PeopleIcon } from '@mui/icons-material'
import { useAuth } from 'contexts/AuthContext'
import ConfirmDialog from 'components/ConfirmDialog'

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
    fontWeight: '800 !important',
    display: 'inline-flex',
    vertialAlign: 'middle',
  },
  lastMessage: {
    fontSize: '14px !important',
  },
  infoContainer: {
    marginLeft: '15px',
    flex: 1
  },
  selected: {
    backgroundColor: 'lightgrey'
  },
  button: {
    marginLeft: 'auto',
    alignSelf: 'center',
  },
  addIcon: {
    color: "#05e254",
  },
  exitIcon: {
    color: "#ff0000"
  },
  timestamp: {
    fontSize: 'small !important',
    color: 	'rgba(0,0,0, 0.6)'
  },

  users: {
    marginLeft: '20px',
    display: 'inline-flex',
    vertialAlign: 'middle'
  }

}))

const MessageGroup = (props) => {
  const classes = useStyles()
  const [showConfirm, setShowConfirm] = useState(false)
  const { id, lastMessage, name, selected, selectable, showAdd, users } = props
  const { currentUser } = useAuth()
  
  const handleSelectClick = () => {
    if (id && selectable)
      props.setSelectedGroup(id)
  }

  const handleConfirmClose = (e) => {
    if (e.target.innerText === 'AGREE')
      handleGroupRemove()

    setShowConfirm(false)
  }

  const handleGroupAdd = () => {
    addUserGroup(id, currentUser.uid)
    incrementGroupUsers(id)
  }

  const handleGroupRemove = () => {
    removeUserGroup(id, currentUser.uid)
    incrementGroupUsers(id, -1)
  }

  return (
    <div 
      className={selected ? `${classes.container} ${classes.selected}` : classes.container}
      onClick={handleSelectClick}
    >
    
      <Avatar src={avatarSrc(lastMessage.username)}/>

      <div className={classes.infoContainer}>        
        
        {/* Group Name */}
  
        <Typography className={classes.groupName}>
          {name}
          
          <PeopleIcon style={{marginLeft: '20px', fontSize: '20px'}}/>
          {users}
      
        </Typography>
         
    
        
        {/* Last Message Text */}
        <Typography className={classes.lastMessage}>
          {lastMessage.content}
        </Typography>
        
        {/* Last Seen Text */}
        <Typography className={classes.timestamp} hidden={!id}>
          {getLastSeen(lastMessage.timestamp)}
        </Typography>
      
      </div>

      {/* Remove group button */}
      <div className={classes.button} hidden={showAdd || !id}>
        <Tooltip title="Leave Group">
          <IconButton onClick={() => setShowConfirm(true)}>
            <ExitIcon className={classes.exitIcon} fontSize="large"/>
          </IconButton>
        </Tooltip>
      </div>

      {/* Add group button */}
      <div className={classes.button} hidden={!showAdd} >
        <Tooltip title="Add Group">
          <IconButton onClick={handleGroupAdd}>
            <AddCircleIcon className={classes.addIcon} fontSize="large"/>
          </IconButton>
        </Tooltip>
      </div>

      {/* Confirm dialog for removing group */}
      <ConfirmDialog 
        open={showConfirm} 
        title="Are you sure you want to leave this group?"
        handleClose={handleConfirmClose}
      />

    </div>
  )
}

MessageGroup.defaultProps = {
  name: 'Default',
  id: null,
  lastMessage: {
    timestamp: null,
    content: "Add groups via searchbar",
    uid: null,
    username: 'Default'
  },
  selected: false,
  selectable: false,
  showAdd: false,
}


export default connect(null, {setSelectedGroup})(MessageGroup)
