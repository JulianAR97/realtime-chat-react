import React, { useContext, useState, useEffect } from 'react';
import { 
  signOut, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth'

import { auth } from 'firebase.js'

const AuthContext = React.createContext()
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const logout = () => {
    return signOut(auth)
  }

  const googleAuth = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    logout,
    googleAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}