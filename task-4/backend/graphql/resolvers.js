const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => User.findById(id),
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      // check if email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) throw new Error("Email already registered.");

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ username, email, password: hashedPassword });

      await user.save();

      // generate jwt token
      const token = jwt.sign(
        { userID: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        token,
        user,
      };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid Credentials");

      // generate jwt token\
      const token = jwt.sign(
        { userID: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        token,
        user,
      };
    },
  },
};

module.exports = resolvers;