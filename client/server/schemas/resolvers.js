// Import necessary modules
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { userController } = require('../controllers/user-controller');

// TODO: Define resolver functions
const resolvers = {
    Query: {

    }

    Mutation: {
        
    }

};

module.exports = resolvers;
