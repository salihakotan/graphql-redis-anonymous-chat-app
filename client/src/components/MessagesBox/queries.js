
import { gql } from "@apollo/client"

export const GET_MESSAGES_QUERY =gql`
query getMessages{
    messages{
        id,
        text
        userId
    }
}
`

export const NEW_MESSAGE_MUTATION =gql`
mutation newMessage($userId:ID!, $text:String!){
    newMessage(userId:$userId, text:$text) {
            id
            text
            userId
        
    }
}
`


export const MESSAGE_CREATED_SUBSCRIPTION=gql`
subscription messageCreated{
  messageCreated{id,text,userId}
}
`