import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Paper } from '@mui/material'
import SideNav from 'components/SideNav'
import MessageRoom from 'components/messages/MessageRoom'
import db from 'firebase.js'
import { onSnapshot, collection } from "firebase/firestore"
import Login from 'components/auth/Login'
import { useAuth } from 'contexts/AuthContext'
import { setGroups } from 'actions/groupActions'
import { connect } from 'react-redux'

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


const App = (props) => {
  const classes = useStyles()
  const { currentUser } = useAuth()

  const sg = props.setGroups
  
  // setGroups when component loads or currentUser changes
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
      sg(snapshot.docs.map(doc => {
        let { name, messages } = doc.data()
        return ({
          id: doc.id,
          name,
          messages
        })
      }))
    });
    return unsubscribe
  }, [sg, currentUser])

  

  return (

    <div className={classes.App}>
      <Paper className={classes.Paper}>
        {
          currentUser ? (
            <>
              <SideNav />
              <MessageRoom />
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

const mapStateToProps = state => ({
  groups: state.groups
})

export default connect(mapStateToProps, {setGroups})(App)
