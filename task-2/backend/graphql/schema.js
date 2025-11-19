const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLNonNull, graphql, graphqlSync } = require("graphql");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// define user type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

// root query (read)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        }
    }
})

// mutations (register, login)
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        register: {
            type: UserType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const hashedPassword = await bcrypt.hash(args.password, 10);
                const user = new User({
                    username: args.username,
                    email: args.email,
                    password: hashedPassword,
                });
                return user.save();
            }
        },
        login: {
            type: GraphQLString,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, args) {
                const user = await User.findOne({ email: args.email });
                if (!user) throw new Error('User not found');
                const isMatch = await bcrypt.compare(args.password, user.password);
                if (!isMatch) throw new Error('Invalid Password');
                return jwt.sign({ userId: user.id}, process.env.JWT_SECRET, { expiresIn: '1d' });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})