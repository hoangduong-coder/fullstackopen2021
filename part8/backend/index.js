const {ApolloServer, UserInputError, gql} = require ('apollo-server');
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
    born: Int!
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

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments (),
    authorCount: async () => Author.collection.countDocuments (),
    allBooks: async () => {
      return Book.find ({});
    },
    allAuthors: async () => {
      return Author.find ({});
    },
  },
  Author: {
    bookCount: async root => {
      return Book.find ({});
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne ({name: args.author});
      const book = new Book ({...args, author: author});
      await book.save ();

      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne ({name: args.name});
      author.name = args.name;
      author.born = args.setBornTo;
      try {
        await author.save ();
      } catch (error) {
        throw new UserInputError (error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
  },
};

const server = new ApolloServer ({
  typeDefs,
  resolvers,
});

server.listen ().then (({url}) => {
  console.log (`Server ready at ${url}`);
});
