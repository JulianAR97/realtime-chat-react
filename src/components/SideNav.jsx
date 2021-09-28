import React from 'react'
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import MessageGroup from 'components/messages/MessageGroup'
import { connect } from 'react-redux'


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

const SideNav = (props) => {
  const classes = useStyles()
  const { groups, selectedGroup } = props

  
  const renderGroups = (groups) => {

    if (groups.length) {
      // if we have groups, render the groups
      return groups.map(group => (
        <MessageGroup
          key={group.id}
          name={group.name}
          lastMessage={group.messages[group.messages.length - 1]}
          selected={group.id === selectedGroup.id}
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

      <div className={classes.body}>
        {renderGroups(groups)}
      </div>
      
    </Container>
  )
}

SideNav.defaultProps = {
  groups: []
}

const mapStateToProps = state => ({
  groups: state.groups,
  selectedGroup: state.selectedGroup
})

export default connect(mapStateToProps, {})(SideNav)
