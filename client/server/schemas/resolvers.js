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
    // TODO: Implement 'addUser' resolver
    // TODO: Implement 'login' resolver
    // TODO: Implement 'saveBook' resolver
    // TODO: Implement 'removeBook'
  },
};

module.exports = resolvers;
