import React, { useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
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
  const [loading, setLoading] = useState(false)

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

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
    login,
    logout,
    signup,
    googleAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}