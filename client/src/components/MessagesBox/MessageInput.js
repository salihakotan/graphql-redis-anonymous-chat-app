import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { NEW_MESSAGE_MUTATION } from './queries'

function MessageInput() {

  const [messageText, setMessageText] = useState("")


  const [saveMessage,{loading}] = useMutation(NEW_MESSAGE_MUTATION)


  const handleClick = ()=> {
    saveMessage({
      variables:{
        text:messageText
      }
    })


    setMessageText("")

  }


  const handleChangeMessage = (e)=> {
      setMessageText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      handleClick()
    }
  }


  return (
    <div className='messageInputBox'>
            <input onKeyDown={handleKeyDown} value={messageText} onChange={handleChangeMessage} disabled={loading} className='messageInput' placeholder='Enter a message...'></input>
            <button onClick={handleClick} disabled={loading} className='sendMessageBtn'>Send</button>
        </div>
  )
}

export default MessageInput