import { createServer } from 'node:http';

// import {RedisPubSub} from "graphql-redis-subscriptions"
import { db } from "./db";
import uniqid from "uniqid";

import { PubSub } from "graphql-subscriptions";


import {createSchema, createYoga} from "graphql-yoga"

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";



// const pubsub = new RedisPubSub()
const pubsub = new PubSub()



const schema = createSchema({

    graphiql: {
        // Use WebSockets in GraphiQL
        subscriptionsProtocol: "WS",
      },

     resolvers :{
        Query: {
          messages: (parent, args) => db.messages,
        },
      
        Mutation: {
          newMessage: (parent, {userId, text }) => {
            const message = {
              id: uniqid(),
              userId,
              text,
            };
                    
            db.messages = [...db.messages,message];

            pubsub.publish("messageCreated", {messageCreated:message})
           
            return message;
          },
        },
      
        Subscription:{
          messageCreated:{
             subscribe: (parent,args)=> pubsub.asyncIterator("messageCreated")
          }
        }
      
      
      },
      
       typeDefs:  /* GraphQL */ `
        type Query {
          messages: [Message!]
        }
      
        type Mutation {
          newMessage(userId:ID!,text: String!): Message!
        }
      
        type Subscription{
          messageCreated: Message
        }
      
        type Message {
          id: ID
          userId:ID!
          text: String
        }
      `
})

const yoga = createYoga({
    landingPage:false,
    graphqlEndpoint:"/",
    schema,
  
})



const server = createServer(yoga)



const wsServer = new WebSocketServer({
    server,
    path: yoga.graphqlEndpoint,
  });


  
// Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
useServer(
    {
      execute: (args) => args.rootValue.execute(args),
      subscribe: (args) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
          yoga.getEnveloped({
            ...ctx,
            req: ctx.extra.request,
            socket: ctx.extra.socket,
            params: msg.payload,
          });
  
        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe,
          },
        };
  
        const errors = validate(args.schema, args.document);
        if (errors.length) return errors;
        return args;
      },
    },
    wsServer
  );

server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000')
  })