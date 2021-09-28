const initialState = {
  groups: [],
  // current messages to display
  selectedGroup: null,
}

const groupReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'SET_GROUPS':
      // When setting groups, if no group is selected, we can just select the first one
      let selectedGroup = state.selectedGroup || action.payload.groups[0]
      
      return ({
        ...state,
        groups: action.payload.groups,
        selectedGroup
      })
    
    case 'SET_SELECTED_GROUP':
      return ({
        ...state,
        selectedGroup: action.payload.selectedGroup
      })
      
    default:
      return state
  }
}

export default groupReducer