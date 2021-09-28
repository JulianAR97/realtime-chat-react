const initialState = {
  groups: [],
  // current messages to display
  messages: [],
  selectedGroup: null,


}

const messagesReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'SET_GROUPS':
      return ({
        ...state,
        groups: action.payload.groups,
      })
    
    default:
      return state
  }
}

export default messagesReducer