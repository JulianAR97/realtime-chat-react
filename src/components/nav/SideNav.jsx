import React, { useState } from 'react'
import { Avatar, Container, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import MessageGroup from 'components/messages/MessageGroup'
import { connect } from 'react-redux'
import NavSearch from 'components/nav/NavSearch'
import { avatarSrc, sortChronological } from 'helpers'
import { Create } from '@mui/icons-material'
import { useAuth } from 'contexts/AuthContext';
import GroupForm from 'components/GroupForm'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0.3,
    borderRight: '1px solid black',
    padding: '20px',
    overflow: 'scroll',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px'
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: '40px',
    padding: '10px',
  },
  createButton: {
    width: '40px',
    height: '40px',
  }
}))

const SideNav = (props) => {
  
  // Variable Declarations
  const { logout, currentUser } = useAuth()
  const classes = useStyles()
  const { groups, selectedGroup, userGroups, username } = props
  const filteredGroups = 
    groups.filter(g => userGroups.includes(g.id))
    .sort((a, b) => sortChronological(a, b))
  
  // State
  const [groupMatches, setGroupMatches] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [showNewGroupForm, setShowNewGroupForm] = useState(false)
  
  // Helper functions
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
          selectable={true}
          showAdd={!userGroups.includes(group.id)}
        />
      ))
    
    } else {
      // otherwise render default group 
      return <MessageGroup />
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setShowNewGroupForm(false)
  }

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleLogout = () => {
    handleMenuClose()
    logout()
  }

  const renderBody = () => {
    if (showNewGroupForm) {
      return <GroupForm  handleClose={handleMenuClose} currentUser={currentUser} />
    } else if (groupMatches.length) {
      return renderGroups(groupMatches)
    } else {
      return renderGroups(filteredGroups)
    }
  }

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )
  

  return (
    <Container className={classes.container}>

      <div className={classes.header}>
        
        <Tooltip title="Profile">
          <IconButton onClick={handleMenuOpen}>
            <Avatar src={avatarSrc(username || 'Default')} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Create a Group">
          <IconButton className={classes.createButton} onClick={() => setShowNewGroupForm(!showNewGroupForm)}>
            <Create />
          </IconButton>        
        </Tooltip>

      </div>
      
      <div className={classes.search}>
        <NavSearch 
          groups={groups} 
          setGroupMatches={setGroupMatches} 
          userGroups={userGroups} 
        />
      </div>

      <div className={classes.body}>
        {renderBody()}
      </div>
      { renderProfileMenu }
    </Container>
  )
}

SideNav.defaultProps = {
  userGroups: [],
  selectedGroup: null,
  groups: [],
  username: null
}

const mapStateToProps = state => ({
  groups: state.groups,
  userGroups: state.userGroups,
  selectedGroup: state.selectedGroup,
  username: state.username
})

export default connect(mapStateToProps, {})(SideNav)
