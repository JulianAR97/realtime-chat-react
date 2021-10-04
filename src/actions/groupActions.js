import db from 'firebase.js'
import { collection, doc, setDoc, updateDoc, increment, Timestamp } from 'firebase/firestore'

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
      }],
      users: 1
    })

    return newGroupRef.id
  } catch (err) {
    alert(err)
  }
}

/**
 * 
 * @param {String} groupId
 * @param {Number} amount (default 1)
 */
export const incrementGroupUsers = (groupId, amount = 1) => {
  try {
    const docRef = doc(db, "groups", groupId)

    updateDoc(docRef, {users: increment(amount)})
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
