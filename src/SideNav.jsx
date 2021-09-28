import React from 'react'
import { Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import MessageGroup from './MessageGroup'


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

  const { groups, handleGroupSelect, selectedGroup } = props
  const classes = useStyles()

  const renderGroups = () => {

    if (groups.length) {
      // if we have groups, render the groups
      return groups.map((group, i) => (
        <MessageGroup
          key={group.id}
          id={group.id}
          name={group.name} 
          lastMessage={group.messages[group.messages.length - 1]}
          handleGroupSelect={handleGroupSelect}
          selectedGroup={selectedGroup}
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
        {renderGroups()}
      </div>
      
    </Container>
  )
}

SideNav.defaultProps = {
  groups: []
}

export default SideNav
