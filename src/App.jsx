import React from 'react'
import { makeStyles } from '@mui/styles'
import { Paper } from '@mui/material'

const useStyles = makeStyles(theme => ({
  App: {
    display: "grid",
    placeItems: "center",
    height: '100vh',
  },
  Paper: {
    display: "flex",
    height: "90vh",
    width: "90vh"
  }
}))


const App = () => {
  const classes = useStyles()
  
  return (
    <div className={classes.App}>
      <Paper className={classes.Paper}>

      </Paper>
    </div>
  )
}

export default App
