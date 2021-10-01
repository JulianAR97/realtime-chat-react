import db from 'firebase.js'
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore'

// Firebase
export const createGroup = async (name) => {
  
  try {
    const newGroupRef = doc(collection(db, "groups"))

    await setDoc(newGroupRef, {
      name,
      messages: [{
        content: "Created new group",
        timestamp: Timestamp.fromDate(new Date()),
        uid: "123",
        username: "Bot"
      }]
    })

    return newGroupRef.id
  } catch (err) {
    alert(err)
  }
}


// Redux
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