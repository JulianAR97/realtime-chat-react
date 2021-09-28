import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useAuth } from 'contexts/AuthContext'

const useStyles = makeStyles(theme => ({

}))

const Login = () => {
  const classes = useStyles()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { googleAuth } = useAuth()
  
  const handleGoogle = async (e) => {
    e.preventDefault()

    try {
      setError('')
      await googleAuth()
      setLoading(true)
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <div className={classes.login}>
      <div className={classes.error}>
        {error}
      </div>
      
      <button onClick={handleGoogle} disabled={loading}>
        Login With Google
      </button>
    </div>
  )

}

export default Login
