import {gql} from '@apollo/client';

export const CREATE_BOOK = gql`
mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    published
    author
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
    title
    published
    author
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
