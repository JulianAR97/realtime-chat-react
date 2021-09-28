
export const setGroups = (groups) => {
  return dispatch => {
    dispatch({type: 'SET_GROUPS', payload: {groups}})
  }
}

export const setSelectedGroup = (group) => {
  return dispatch => {
    dispatch({type: 'SET_SELECTED_GROUP', payload: {group}})
  }
}