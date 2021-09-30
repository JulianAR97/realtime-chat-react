import { combineReducers } from 'redux';
import profileReducer from 'reducers/profileReducer'
import groupReducer from 'reducers/groupReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  groups: groupReducer
})

export default rootReducer