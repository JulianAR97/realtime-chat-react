import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useAuth } from 'contexts/AuthContext'
import { Redirect } from 'react-router-dom'
const useStyles = makeStyles(theme => ({

}))

const Login = () => {
  const classes = useStyles()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { googleAuth, currentUser } = useAuth()
  
  const handleGoogle = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')
      googleAuth()
    } catch (err) {
      setError(err.message)
    } 
  }

  return (
    <>
      { currentUser ? 
        <Redirect to="/chat" />
      : 
        <div className={classes.login}>
          <div className={classes.error}>
            {error}
          </div>
        
          <button onClick={handleGoogle} disabled={loading}>
            Login With Google
          </button>
        </div>
      }
    </>
  )

}

export default Login
