const initialState = {
  groups: [],
  userGroups: [],
  selectedGroup: null,
  username: null,
}

const groupReducer = (state = initialState, action) => {
  let selectedGroup;
  
  switch (action.type) {
    
    case 'SET_GROUPS':
      // When setting groups, if no group is selected, we can just select the first one
      
      return (
        {
          ...state,
          groups: action.payload.groups,
        }
      )
    
    case 'SET_SELECTED_GROUP':
      
      return ({
        ...state,
        selectedGroup: action.payload.groupId
      })

    case 'SET_PROFILE':
      if (selectedGroup) {
        selectedGroup = action.payload.groups.find(g => g.id === selectedGroup.id)
      } else {
        selectedGroup = action.payload.groups.length ? action.payload.groups[0] : null
      }
    
      return (
        {
          groups: [...state.groups], 
          username: action.payload.username,
          userGroups: action.payload.groups,
          selectedGroup
        }
      )

    default:  
      return state
  
  }
}

export default groupReducer