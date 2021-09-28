import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { makeStyles } from '@mui/styles'
import { Paper } from '@mui/material'
import SideNav from './SideNav'
import MessageRoom from './MessageRoom'
import db from './firebase.js'
import { onSnapshot, collection } from "firebase/firestore"

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
  
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "groups"), (snapshot) => {
      setGroups(snapshot.docs.map(doc => {
        let { name, messages } = doc.data()
        return ({
          id: doc.id,
          name,
          messages
        })
      }
      ))
    });

    return unsub
    
  }, [])

  const handleGroupSelect = (groupID) => {
    setSelectedGroup(groupID)
    setMessages(() => {
      let group = groups.find(g => g.id === groupID)
      return group.messages
    })
  }
  

  return (
    <div className={classes.App}>
      <Paper className={classes.Paper}>
        <SideNav groups={groups} handleGroupSelect={handleGroupSelect} selectedGroup={selectedGroup}/>
        <MessageRoom messages={messages}/>
      </Paper>
    </div>
  )
}

export default App
