import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '35px',
    borderRadius: '20px'
  },
  input: {
    border: 'none',
    outline: 'none',
    margin: '0px 10px',
    width: '100%',
    fontSize: '16px'
  },
  filteredSearch: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 99999
  },
  match: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    zIndex: 99999
  }
}))

const NavSearch = (props) => {
  const classes = useStyles()
  
  
  const filterGroups = (text) => {
    let matches = props.groups.filter(group => {
      const regex = new RegExp(`${text}`, 'gi');
      return group.name.match(regex)
    })

    // set matches from search in parent component
    return matches
  }

  const handleChange = (e) => {
    // unless search bar is empty, execute search
    let matches = []
    if (e.target.value) {
      matches = filterGroups(e.target.value)
    }

    props.setGroupMatches(matches)
  }

  return (
    <>

      <div className={classes.container}>
        <input 
          className={classes.input} 
          onChange={handleChange}
          type="text" 
          placeholder="Search chats" 
        />

      </div>
      
    </>
  )
}

NavSearch.defaultProps = {
  groups: [],
  userGroups: []
}


export default NavSearch
