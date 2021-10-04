import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Avatar, IconButton, Tooltip, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { setSelectedGroup } from 'actions/groupActions'
import { addUserGroup, removeUserGroup } from 'actions/profileActions'
import { avatarSrc, getLastSeen } from 'helpers.js'
import { AddCircle as AddCircleIcon, HighlightOff as ExitIcon } from '@mui/icons-material'
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
  }
}))

const MessageGroup = (props) => {
  const classes = useStyles()
  const [showConfirm, setShowConfirm] = useState(false)
  const { id, lastMessage, name, selected, selectable, showAdd } = props
  const { currentUser } = useAuth()
  
  const handleSelectClick = () => {
    if (id && selectable)
      props.setSelectedGroup(id)
  }

  const handleConfirmClose = (e) => {
    console.log(e.target.innerText)
    if (e.target.innerText === 'AGREE')  
      removeUserGroup(id, currentUser.uid) 

    setShowConfirm(false)
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
        
        <Typography className={classes.timestamp}>
          {getLastSeen(lastMessage.timestamp)}
        </Typography>
      </div>

      {/* Remove group button */}
      <div className={classes.button} hidden={showAdd}>
        <Tooltip title="Leave Group">
          <IconButton onClick={() => setShowConfirm(true)}>
            <ExitIcon className={classes.exitIcon} fontSize="large"/>
          </IconButton>
        </Tooltip>
      </div>

      {/* Add group button */}
      <div className={classes.button} hidden={!showAdd} >
        <Tooltip title="Add Group">
          <IconButton onClick={() => addUserGroup(id, currentUser.uid)}>
            <AddCircleIcon className={classes.addIcon} fontSize="large"/>
          </IconButton>
        </Tooltip>
      </div>

      {/* Confirm dialog for removing group */}
      <ConfirmDialog 
        open={showConfirm} 
        title="Are you sure you want to leave this Group"
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
