import React, { useEffect } from "react";
import MessageInput from "./MessageInput";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES_QUERY, MESSAGE_CREATED_SUBSCRIPTION } from "./queries";
import ScrollableFeed from "react-scrollable-feed"

import styles from "./styles.module.css"
import uniqid from "uniqid"

function MessagesList() {

  const myUserId = localStorage.getItem("myUserId",uniqid())

  if(!myUserId) {
    localStorage.setItem("myUserId",uniqid())
  }

  

  
  const {called,data, error, loading,subscribeToMore} = useQuery(GET_MESSAGES_QUERY);


  useEffect(()=> {

    if(!loading && called){
      subscribeToMore({
        document:MESSAGE_CREATED_SUBSCRIPTION,
        updateQuery: (prev, {subscriptionData})=> {

          if(!subscriptionData.data) return prev.messages

          return {
            messages:[
              ...prev.messages,
              subscriptionData.data.messageCreated
             
            ]
          }

        }
      })
    }


  },[subscribeToMore,loading, called])
  


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;

    
  }



  const { messages } = data;

  return (
    <div>
      <div className="messagesBoxArea">
        <div className="messageListBox">

      <ScrollableFeed forceScroll={true}>

        {
          messages && (
            messages.map((message,i) => (
              <div key={i} className={`${styles.messageItem} ${message.userId === myUserId ? styles.right : "" }`}>{message.text}
             
              </div>
              
            ))
          )
        }
        </ScrollableFeed>

        </div>
      </div>

      <MessageInput myUserId={myUserId} />
    </div>
  );
}

export default MessagesList;
