const {ApolloServer, gql} = require ('apollo-server');
const {v1: uuid} = require ('uuid');
const mongoose = require ('mongoose');
const Book = require ('./schema/Book');
const Author = require ('./schema/Author');
const config = require ('./utils/config');

console.log ('connecting to', config.MONGO_URL);

mongoose
  .connect (config.MONGO_URL)
  .then (() => {
    console.log ('connected to MongoDB');
  })
  .catch (error => {
    console.log ('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

// const resolvers = {
//   Query: {
//     bookCount: () => books.length,
//     authorCount: () => authors.length,
//     // allBooks: (root, args) => books.filter (b => b.author === args.author),
//     // allBooks: (root, args) => books.filter (b => b.genres.includes (args.genre)),\
//     allBooks: () => books,
//     allAuthors: () => authors,
//   },
//   Author: {
//     bookCount: root => {
//       return books.filter (obj => obj.author === root.name).length;
//     },
//   },
//   Mutation: {
//     addBook: (root, args) => {
//       const book = {...args, id: uuid ()};
//       books = books.concat (book);
//       if (!authors.find (b => b.name === args.author)) {
//         authors = authors.concat ({
//           name: args.author,
//           id: uuid (),
//         });
//       }
//       return book;
//     },
//     editAuthor: (root, args) => {
//       const author = authors.find (a => a.name === args.name);
//       if (!author) {
//         return null;
//       }
//       const updatedAuthor = {
//         ...author,
//         name: args.name,
//         born: args.setBornTo,
//       };
//       authors = authors.map (
//         obj =>
//           obj.name === args.name || obj.born === args.setBornTo
//             ? updatedAuthor
//             : obj
//       );
//       return updatedAuthor;
//     },
//   },
// };

const server = new ApolloServer ({
  typeDefs,
  resolvers,
});

server.listen ().then (({url}) => {
  console.log (`Server ready at ${url}`);
});
