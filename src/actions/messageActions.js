
export const setGroups = (groups) => {
  return dispatch => {
    dispatch({type: 'SET_GROUPS', groups})
  }
}