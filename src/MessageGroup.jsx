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
  }
}))

const MessageGroup = (props) => {

  const classes = useStyles()
  
  return (
    <div className={classes.container}>
      <Avatar />
      <div className={classes.infoContainer}>
        <Typography className={classes.groupName}>
          {props.groupName}
        </Typography>
        <Typography className={classes.lastMessage}>
          {props.lastMessage}
        </Typography>
      </div>
    </div>
  )
}

MessageGroup.defaultProps = {
  groupName: 'Default',
  lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
}

export default MessageGroup
