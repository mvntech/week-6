const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
id: ID!
username: String!
email: String!
password: String!
}

type AuthPayload {
token: String!
user: User!
}

type Query {
users: [User!]
user(id: ID!): User
}

type Mutation {
register(username: String!, email: String!, password: String!): AuthPayload!
login(email: String!, password: String!): AuthPayload!
}
`;

module.exports = typeDefs;
