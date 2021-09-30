const initialState = {
  username: null,
  groups: [],
}

const profileReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'SET_PROFILE':
      return (
        {
          username: action.payload.usernam,
          groups: action.payload.groups
        }
      )
    
    default:
      return state
  }
}

export default profileReducer