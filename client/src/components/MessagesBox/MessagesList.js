import React from "react";
import MessageInput from "./MessageInput";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES_QUERY } from "./queries";
import ScrollableFeed from "react-scrollable-feed"

function MessagesList() {
  const { data, error, loading } = useQuery(GET_MESSAGES_QUERY);

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
              <div key={i} className="messageItem">{message.text}</div>

            ))
          )
        }
        </ScrollableFeed>

        </div>
      </div>

      <MessageInput />
    </div>
  );
}

export default MessagesList;
