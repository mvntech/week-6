require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose")
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const app = express();
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB!")
})

const server = new ApolloServer({ typeDefs, resolvers })

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Server running on http:localhost:${PORT}${server.graphqlPath}`)
    })
}

startApolloServer();