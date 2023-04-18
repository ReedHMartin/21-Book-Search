const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: String!): User
  }

  input BookInput {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }
`;

module.exports = typeDefs;
