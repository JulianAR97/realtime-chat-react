
export const setGroups = (groups) => {
  return dispatch => {
    dispatch({type: 'SET_GROUPS', payload: {groups}})
  }
}

export const setSelectedGroup = (groupId) => {
  return dispatch => {
    dispatch({type: 'SET_SELECTED_GROUP', payload: {groupId}})
  }
}