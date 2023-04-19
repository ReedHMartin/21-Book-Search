// Import necessary libraries from the `@apollo/client` package
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define the URL of the GraphQL server
const API_URL = 'http://localhost:3001/graphql';

// Create an `httpLink` object that points to the GraphQL server
const httpLink = createHttpLink({
  uri: API_URL,
});

// Create an `authLink` object that adds an authentication token to the headers
const authLink = setContext((_, { headers }) => {
  // Retrieve the token from local storage
  const token = localStorage.getItem('id_token');
  // Return an object with the headers, including the token (if it exists)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the `client` object using the ApolloClient constructor
const client = new ApolloClient({
  // Combine the `authLink` and `httpLink` using the `concat` method
  link: authLink.concat(httpLink),
  // Create a new `InMemoryCache` instance
  cache: new InMemoryCache(),
});

// Export the `client` object as the default export of this module
export default client;
