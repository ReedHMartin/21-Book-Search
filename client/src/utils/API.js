import { gql, useQuery, useMutation } from '@apollo/client';

// Define GraphQL queries and mutations using `gql` function from `@apollo/client`
const GET_ME = gql`
  query GetMe($token: String!) {
    me(token: $token) {
      id
      name
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($userData: CreateUserInput!) {
    createUser(userData: $userData) {
      id
      name
      email
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($userData: LoginUserInput!) {
    loginUser(userData: $userData) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const SAVE_BOOK = gql`
  mutation SaveBook($bookData: SaveBookInput!, $token: String!) {
    saveBook(bookData: $bookData, token: $token) {
      id
      title
      authors
      description
      image
      link
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: ID!, $token: String!) {
    deleteBook(bookId: $bookId, token: $token) {
      id
    }
  }
`;

const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
      id
      volumeInfo {
        title
        authors
        description
        imageLinks {
          thumbnail
        }
        infoLink
      }
    }
  }
`;

// Export API functions using `useQuery` and `useMutation` hooks
export function useGetMe(token) {
  // Use the `useQuery` hook to execute the `GET_ME` query
  const { loading, error, data } = useQuery(GET_ME, {
    variables: { token },
  });
  return {
    loading,
    error,
    user: data ? data.me : null,
  };
}

export function useCreateUser() {
  // Use `useMutation` hook to execute `CREATE_USER` mutation
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);
  return {
    createUser: (userData) =>
      createUser({ variables: { userData } }),
    loading,
    error,
    user: data ? data.createUser : null,
  };
}

export function useLoginUser() {
  // Use `useMutation` hook to execute `LOGIN_USER` mutation
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);
  return {
    loginUser: (userData) =>
      loginUser({ variables: { userData } }),
    loading,
    error,
    token: data ? data.loginUser.token : null,
    user: data ? data.loginUser.user : null,
  };
}

export function useSaveBook(token) {
  // Use `useMutation` hook to execute `SAVE_BOOK` mutation
  const [saveBook, { loading, error, data }] = useMutation(SAVE_BOOK);
  return {
    saveBook: (bookData) =>
      saveBook({ variables: { bookData, token } }),
    loading,
    error,
    book: data ? data.saveBook : null,
  };
}

export function useDeleteBook(token) {
  // Use `useMutation` hook to execute `DELETE_BOOK` mutation
  const [deleteBook, { loading, error, data }] = useMutation(DELETE_BOOK);
  return {
    deleteBook: (bookId) =>
      deleteBook({ variables: { bookId, token } }),
    loading,
    error,
    deletedBookId: data ? data.deleteBook.id : null,
  };
}

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
