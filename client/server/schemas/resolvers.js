// Import necessary modules
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { userController } = require('../controllers/user-controller');

// Define resolver functions
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // If authenticated, find the user data using the user's ID and return it
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }

      // If not authenticated, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  // Handle write operations
  Mutation: {
    // Implement 'addUser' resolver
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
    },
    
    // Implement 'login' resolver
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('Incorrect email or password');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect email or password');
        }
  
        const token = signToken(user);
        return { token, user };
      },

    // Implement 'saveBook' resolver
    saveBook: async (parent, { bookData }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookData } },
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },

    // Implement 'removeBook'
    removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
          );
  
          return updatedUser;
        }
  
        throw new AuthenticationError('You need to be logged in!');
      },
  },
};

module.exports = resolvers;
