const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");

import { ApolloServer, gql } from "apollo-server";

const resolvers = {
    Query:{
        message: (parent,args)=> "helloo"
    }
}

const typeDefs = gql`

    type Query{
        message:String
    }

`


const server = new ApolloServer({
    resolvers,
    typeDefs,
   
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground({})
    ]
})



server.listen().then(({url})=> console.log(`apollo server is up at ${url}`))
