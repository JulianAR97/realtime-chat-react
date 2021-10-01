import React, { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { AddCircle as AddCircleIcon, HighlightOff as ExitIcon } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { createGroup } from 'actions/groupActions'
import { addUserGroup } from 'actions/profileActions'

const useStyles = makeStyles(theme => ({
  container:  {
    alignItems: 'center',
    borderBottom: '1px solid #f6f6f6',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '8px',
    padding: '20px',
  },
  buttons: {
    flex: 0.3,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  createIcon: {
    color: "#05e254",
  },
  exitIcon: {
    color: "#ff0000"
  },
  input: {
    border: 'none',
    outline: 'none',
    fontSize: '16px'
  },
  inputContainer: {
    padding: '5px',
    height: '25px',
    border: '1px solid black',
    borderRadius: '20px',
    display: 'flex',
    flex: 0.7,
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    width: '100%',
  },
  header: {
    marginBottom: '10px'
  }
}))
const GroupForm = (props) => {
  const classes = useStyles()

  const [groupName, setGroupName] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()
    // Set showGroup form to false
    // Create group firebase
    createGroup(groupName)
      .then(groupId => addUserGroup(groupId, props.currentUser.uid))
      .then(() => alert('Created new group'))
      .then(() => handleExit())
      .catch(() => {
        alert('Failed to create group')
        handleExit()
      })
  }

  const handleExit = () => {
    props.handleClose()
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h3>Create a New Group</h3>
      </div>
      
      <form className={classes.form}>
        <div className={classes.inputContainer}>
          <input
            className={classes.input} 
            value={groupName} 
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group Name"
          />

        </div>

        <div className={classes.buttons} >
          <IconButton onClick={handleExit}>
            <Tooltip title="Cancel">
              <ExitIcon className={classes.exitIcon} fontSize="large" />
            </Tooltip>
          </IconButton>
          
          <IconButton onClick={handleCreate} type="submit" disabled={!groupName}>
            <Tooltip title="Create Group">
              <AddCircleIcon className={classes.createIcon} fontSize="large"/>
            </Tooltip>
          </IconButton>
        
        </div> 

      </form>
    </div>
  )
}

export default GroupForm
