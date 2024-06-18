
import { gql } from "@apollo/client"

export const GET_MESSAGES_QUERY =gql`
query getMessages{
    messages{
        id,
        text
    }
}
`

export const NEW_MESSAGE_MUTATION =gql`
mutation newMessage($text:String!){
    newMessage(text:$text) {
            id
            text
        
    }
}
`


export const MESSAGE_CREATED_SUBSCRIPTION=gql`
subscription messageCreated{
  messageCreated{id,text}
}
`