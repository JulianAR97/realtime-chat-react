import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Paper, useTheme } from '@mui/material'
import db from 'firebase.js'
import { onSnapshot, collection , doc} from "firebase/firestore"
import Login from 'components/auth/Login'
import { useAuth } from 'contexts/AuthContext'
import { setGroups } from 'actions/groupActions'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Chat from 'components/Chat'
import { getProfile, setProfile } from 'actions/profileActions'


const useStyles = makeStyles(theme => ({
  App: {
    display: "grid",
    placeItems: "center",
    height: '100vh',
  },
  Paper: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down('md')]: {
      flexDirection: "column"
    },
    height: "90vh",
    width: "90vw",
    backgroundColor: 'lightPink !important',
  }
}))


const App = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { currentUser } = useAuth()
  const sg = props.setGroups
  const sp = props.setProfile
  
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

  // When currentUser changes, getProfile, and then setProfile in redux
  useEffect(() => {
    if (currentUser) {
      getProfile(currentUser)
        .then(profile => sp(profile))
        .then(() => 
          onSnapshot(doc(db, 'profiles', currentUser.uid), doc => {
            const profile = doc.data()
            sp(profile)
          }))
    }

  }, [sp, currentUser])


  return (

    <div className={classes.App}>
      <Paper className={classes.Paper}>
        <Router>
          <Switch>
            <Route path="/chat" component={Chat} />
            <Route path="/login" component={Login} />

            <Redirect from='*' to="/chat" />
          </Switch>
        </Router>
      </Paper>
    </div>
  
  )
}

const mapStateToProps = state => ({
  groups: state.groups
})

export default connect(mapStateToProps, { setGroups, setProfile })(App)
