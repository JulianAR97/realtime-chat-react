import db from 'firebase.js'
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

// Firebase

// Get or create profile
export const getProfile = async (currentUser) => {
  let docRef = doc(db, "profiles", currentUser.uid)

  let docSnap = await getDoc(docRef)

  if (docSnap.exists())
    return docSnap.data()
  
  else {
    
    const profilesRef = collection(db, 'profiles')
    // create new doc with currentUser.uid as the document id
    await setDoc(doc(profilesRef, currentUser.uid), {
      uid: currentUser.uid,
      username: currentUser.displayName,
      groups: []
    })
    
    docRef = doc(db, "profiles", currentUser.uid)
    docSnap = await getDoc(docRef)

    if (docSnap.exists())
      return docSnap.data()
  }
}

export const addUserGroup = async(groupId, uid) => {
  const profileDocRef = doc(db, "profiles", uid)

  await updateDoc(profileDocRef, {
    // arrayUnion works like push
    "groups": arrayUnion(groupId)
  })
}


// Redux

// set profile
export const setProfile = (profile) => {
  const {username, groups} = profile
  return dispatch => {
    dispatch({type: 'SET_PROFILE', payload: { username, groups }})
  }
}

