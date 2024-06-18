import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { ApolloServer, gql } from "apollo-server";

import { db } from "./db";
import uniqid from "uniqid";

const resolvers = {
  Query: {
    messages: (parent, args) => db.messages,
  },

  Mutation: {
    newMessage: (parent, { text }) => {
      const message = {
        id: uniqid(),
        text,
      };

      db.messages = [...db.messages,message];
      return message;
    },
  },
};

const typeDefs = gql`
  type Query {
    messages: [Message!]
  }

  type Mutation {
    newMessage(text: String!): Message!
  }

  type Message {
    id: ID
    text: String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => console.log(`apollo server is up at ${url}`));
