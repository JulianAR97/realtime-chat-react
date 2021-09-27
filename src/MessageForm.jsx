import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flex: 1,
  },
  input: {
    flex: 1,
    borderRadius: '30px',
    padding: '10px',
    border: 'none',
    outline: 'none'
  },
}) )

const MessageForm = (props) => {
  const classes = useStyles()
  
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // send to firebase
    
    setInput("")
  }

  return (
    <form className={classes.form}>
      <input
        className={classes.input} 
        placeholder={props.placeholder}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <IconButton type="submit" onClick={handleSubmit}>
        <SendIcon />
      </IconButton>
    </form>
  )
}

MessageForm.defaultProps = {
  placeholder: "Enter message..."
}

export default MessageForm
