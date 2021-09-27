import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import MessageGroup from './MessageGroup'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0.3,
    borderRight: '1px solid black',
    padding: '20px',
    overflow: 'scroll'
  },
  header: {

  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  }
}))

const SideNav = () => {

  const classes = useStyles()
  
  return (
    <Container className={classes.container}>

      <div className={classes.header}>

      </div>

      <div className={classes.body}>
        <MessageGroup />
        <MessageGroup />
        <MessageGroup />
      </div>
      
    </Container>
  )
}

export default SideNav
