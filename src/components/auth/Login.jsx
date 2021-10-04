import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useAuth } from 'contexts/AuthContext'
import { Redirect } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
const useStyles = makeStyles(theme => ({
  login: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  buttonContainer: {
    padding: '20px'
  },
  button: {
    backgroundColor: '#4285f4 !important', // google blue
  }
}))

const Login = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { googleAuth, currentUser } = useAuth()
  
  const handleGoogle = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      googleAuth()
    } catch (err) {
      alert(err.message)
    } 
  }

  return (
    <>
      { currentUser ? 
        <Redirect to="/chat" />
      : 
        <div id="login" className={classes.login}>
          
          <div className={classes.title}>
            <Typography variant="h2">
              Login
            </Typography>
          </div>

          <div className={classes.buttonContainer}>
            <Button 
              variant="contained" 
              className={classes.button} 
              onClick={handleGoogle} 
              disabled={loading}
            >
              Login With Google
            </Button>
          </div>
        
        </div>
      }
    </>
  )

}

export default Login
