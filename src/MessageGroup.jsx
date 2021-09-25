import React from 'react'
import { makeStyles } from '@mui/styles'
import { Container, Typography } from '@mui/material'

const useStyles = makeStyles(theme => ({

}))

const MessageGroup = (props) => {
  return (
    <Container>
      <Typography variant="h4">
        {props.groupName}
      </Typography>
      <Typography variant="body">
        {props.lastMessage}
      </Typography>
    </Container>
  )
}

MessageGroup.defaultProps = {
  groupName: 'Default',
  lastMessage: 'This is a default message'
}

export default MessageGroup
