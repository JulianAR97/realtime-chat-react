import React from 'react'
import { makeStyles } from '@mui/styles'
import { Paper } from '@mui/material'
import SideNav from './SideNav'
import MessageRoom from './MessageRoom'

const useStyles = makeStyles(theme => ({
  App: {
    display: "grid",
    placeItems: "center",
    height: '100vh',
  },
  Paper: {
    display: "flex",
    height: "90vh",
    width: "90vw"
  }
}))


const App = () => {
  const classes = useStyles()
  
  return (
    <div className={classes.App}>
      <Paper className={classes.Paper}>
        <SideNav />
        <MessageRoom />
      </Paper>
    </div>
  )
}

export default App
