import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Paper } from '@mui/material'
import SideNav from 'components/SideNav'
import MessageRoom from 'components/messages/MessageRoom'
import db from 'firebase.js'
import { onSnapshot, collection } from "firebase/firestore"
import Login from 'components/auth/Login'
import { useAuth } from 'contexts/AuthContext'

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
  const [groups, setGroups] = useState([])
  const [messages, setMessages] = useState([])
  const [selectedGroup, setSelectedGroup] = useState("")
  const { currentUser } = useAuth()
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
      setGroups(snapshot.docs.map(doc => {
        let { name, messages } = doc.data()
        return ({
          id: doc.id,
          name,
          messages
        })
      }))
    });
    return unsubscribe
  }, [])

  useEffect(() => {
    if (groups[0] && !selectedGroup) {
      setSelectedGroup(groups[0].id)
    }
  }, [groups, selectedGroup])

  useEffect(() => {
    if (groups.length && selectedGroup) {
      let group = groups.find(group => group.id === selectedGroup)
      setMessages(group.messages)
    }
  }, [groups, selectedGroup])

  const handleGroupSelect = (groupID) => {
    setSelectedGroup(groupID)
  }

  return (

    <div className={classes.App}>
      <Paper className={classes.Paper}>
        {currentUser ? (
          <>
            <SideNav groups={groups} handleGroupSelect={handleGroupSelect} selectedGroup={selectedGroup}/>
            <MessageRoom messages={messages} selectedGroup={selectedGroup}/>
          </>
        )
        : (
          <Login />
        )
        }
      </Paper>
    </div>
  
  )
}

export default App
