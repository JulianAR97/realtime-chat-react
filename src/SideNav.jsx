import React, {useState, useEffect} from 'react'
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import MessageGroup from './MessageGroup'
import db from './firebase.js'
import { onSnapshot, collection} from "firebase/firestore"


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0.3,
    borderRight: '1px solid black',
    padding: '20px',
    overflow: 'scroll'
  },
  header: {

  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  }
}))

const SideNav = () => {

  const classes = useStyles()
  const [groups, setGroups] = useState([])


  useEffect(() => {
    const unsub = onSnapshot(collection(db, "groups"), (snapshot) => {
      setGroups(snapshot.docs.map(doc => {
        let { name } = doc.data()
        return ({
          id: doc.id,
          name
        })
      }
      ))
    });

    return unsub
    
  }, [])

  const renderGroups = () => {

    if (groups.length) {
      // if we have groups, render the groups
      return groups.map(group => (
        <MessageGroup name={group.name} />
      ))
    
    } else {
      // otherwise render default group 
      return <MessageGroup />
    }
  }

  console.log(groups)
  return (
    <Container className={classes.container}>

      <div className={classes.header}>

      </div>

      <div className={classes.body}>
        {renderGroups()}
      </div>
      
    </Container>
  )
}

export default SideNav
