import React from 'react'
import MessageRoom from 'components/messages/MessageRoom'
import SideNav from 'components/nav/SideNav'
import { useAuth } from 'contexts/AuthContext'
import { Redirect } from 'react-router-dom'
const Chat = () => {
  const { currentUser } = useAuth()
  
  return (
    <>
      {currentUser ?
        <>
          <SideNav />
          <MessageRoom />
        </>
      : 
        <Redirect to="/login" />
      }
    </>
  )
}

export default Chat
