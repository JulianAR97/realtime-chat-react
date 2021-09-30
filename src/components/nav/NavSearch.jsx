import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '35px',
    borderRadius: '20px'
  },
  input: {
    border: 'none',
    outline: 'none',
    margin: '0px 10px',
    width: '100%'
  }
}))

const NavSearch = () => {
  
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <input className={classes.input} type="text" placeholder="Search chats" />
    </div>
  )
}

export default NavSearch
