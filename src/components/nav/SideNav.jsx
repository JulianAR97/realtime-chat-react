import React from 'react'
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import MessageGroup from 'components/messages/MessageGroup'
import { connect } from 'react-redux'
import NavSearch from 'components/nav/NavSearch'


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
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: '40px',
    padding: '10px'
  }
}))

const SideNav = (props) => {
  const classes = useStyles()
  const { groups, selectedGroup, userGroups } = props

  const filteredGroups = () => groups.filter(g => userGroups.includes(g.id))

  
  const renderGroups = (filteredGroups) => {
   
    if (filteredGroups.length) {

      // if we have groups, render the groups
      return filteredGroups.map(group => (
        <MessageGroup
          key={group.id}
          id={group.id}
          name={group.name}
          lastMessage={group.messages[group.messages.length - 1]}
          selected={group.id === selectedGroup}
        />
      ))
    
    } else {
      // otherwise render default group 
      return <MessageGroup />
    }
  }

  return (
    <Container className={classes.container}>

      <div className={classes.header}>
        
      </div>
      
      <div className={classes.search}>
        <NavSearch />
      </div>

      <div className={classes.body}>
        {renderGroups(filteredGroups())}
      </div>
      
    </Container>
  )
}

SideNav.defaultProps = {
  userGroups: [],
  selectedGroup: null,
  groups: []
}

const mapStateToProps = state => ({
  groups: state.groups,
  userGroups: state.userGroups,
  selectedGroup: state.selectedGroup
})

export default connect(mapStateToProps, {})(SideNav)
