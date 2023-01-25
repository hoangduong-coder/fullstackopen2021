import {gql} from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author {
      bookCount
      born
      id
      name
    }
    genres
    id
    published
    title
  }
`;

export const CREATE_BOOK = gql`
  mutation Mutation(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      author {
        bookCount
        born
        id
        name
      }
      genres
      published
      title
    }
  }
`;

export const ALL_AUTHORS = gql`
  query Query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query Query {
    allBooks {
      author {
        name
        id
        born
        bookCount
      }
      genres
      id
      published
      title
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
      author {
        bookCount
        born
        name
        id
      }
      genres
      title
      published
      id
    }
  }
`;

export const EDIT_BIRTHYEAR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const USER = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`;

export const ADDBOOK_ANNOUNCEMENT = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
