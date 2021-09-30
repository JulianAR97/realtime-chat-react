import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { doc, updateDoc, Timestamp, arrayUnion } from 'firebase/firestore'
import db from 'firebase.js'
import { useAuth } from 'contexts/AuthContext'
import { connect } from 'react-redux'

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
  const [loading, setLoading] = useState(true)
 
  const { currentUser } = useAuth()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const username = currentUser.displayName
    const uid = currentUser.uid  
    
    const docRef = doc(db, 'groups', props.selectedGroup)
    
    const newMessage = { 
      username, 
      uid, 
      content: input, 
      timestamp: Timestamp.fromDate(new Date()) 
    }

    if (docRef) {
      try {
        updateDoc(docRef, {
          messages: arrayUnion(newMessage)
        })
      } catch (err) {
        alert(err.message)
      } 
    }
    
    
    // send to firebase
    setLoading(false)
    setInput("")
  }

  const handleInputChange = (e) => {
    // don't let user submit an empty message
    if (e.target.value) {
      setLoading(false)
    } else {
      setLoading(true)
    }
    setInput(e.target.value)
  }

  
  return (
    <form className={classes.form}>
      <input
        className={classes.input} 
        placeholder={props.placeholder}
        type="text"
        value={input}
        onChange={handleInputChange}
      />
      {/* if component is loading or there isn't a selected group, disable submit */ }
      <IconButton type="submit" onClick={handleSubmit} disabled={loading || !props.selectedGroup}>
        <SendIcon />
      </IconButton>
    </form>
  )
}

MessageForm.defaultProps = {
  placeholder: "Enter message..."
}

const mapStateToProps = (state) => ({
  userGroups: state.userGroups,
  selectedGroup: state.selectedGroup
})

export default connect(mapStateToProps, null)(MessageForm)
