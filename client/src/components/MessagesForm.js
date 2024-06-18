import React from 'react'

function MessagesForm() {
  return (
    <div>
        <div className='messagesBoxArea'>
        <div className='messageListBox'>
            <div className='messageItem'>Sample message!</div>
        </div>
    </div>

     <div className='messageInputBox'>
            <input className='messageInput' placeholder='Enter a message...'></input>
            <button className='sendMessageBtn'>Send</button>
        </div>

    </div>
  )
}

export default MessagesForm