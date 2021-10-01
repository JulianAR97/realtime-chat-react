import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { useAuth } from 'contexts/AuthContext'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({

}))

const Login = () => {
  const classes = useStyles()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { googleAuth } = useAuth()
  const history = useHistory()
  
  const handleGoogle = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')
      await googleAuth()
      history.push('/chat')
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
