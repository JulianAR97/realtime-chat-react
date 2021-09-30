import React from 'react'
import { makeStyles } from '@mui/styles'
import { Avatar, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { setSelectedGroup } from 'actions/groupActions'

const useStyles = makeStyles(theme => ({
  container:  {
    borderBottom: '1px solid #f6f6f6',
    cursor: 'pointer',
    display: 'flex',
    marginBottom: '8px',
    padding: '20px',
    '&:hover': {
      backgroundColor: 'lightgrey',
    },
  },
  groupName: {
    fontSize: '16px !important',
    fontWeight: '800 !important'
  },
  lastMessage: {
    fontSize: '14px !important',
  },
  infoContainer: {
    marginLeft: '15px',
  },
  selected: {
    backgroundColor: 'lightgrey'
  }
}))

const MessageGroup = (props) => {
  const classes = useStyles()
  
  const { id, lastMessage, name, selected } = props
  
  const avatarSrc = () => {
    // John Smith => JS e.g.
    let slug = lastMessage.username.split(' ').slice(0, 2).map(x => x[0]).join('')
    
    return `https://avatars.dicebear.com/api/initials/${slug}.svg`
  }
  

  return (
    <div 
      className={selected ? `${classes.container} ${classes.selected}` : classes.container}
      onClick={() => props.setSelectedGroup(id)}
    >
      <Avatar src={avatarSrc()}/>
      
      <div className={classes.infoContainer}>
        
        <Typography className={classes.groupName}>
          {name}
        </Typography>
        <Typography className={classes.lastMessage}>
          {lastMessage.content}
        </Typography>

      </div>

    </div>
  )
}

MessageGroup.defaultProps = {
  name: 'Default',
  id: '1234',
  lastMessage: {
    timestamp: {seconds: 1632740700, nanoseconds: 0},
    content: "Add groups via searchbar",
    uid: '1234',
    username: 'John Doe'
  },
  selected: true
}

const mapStateToProps = state => ({
  selectedGroup: state.selectedGroup
})

export default connect(mapStateToProps, {setSelectedGroup})(MessageGroup)

/*
props: 
group: {

},
selected Boolean

*/