const {ApolloServer, UserInputError, gql} = require ('apollo-server');
const mongoose = require ('mongoose');
const Book = require ('./schema/Book');
const Author = require ('./schema/Author');
const config = require ('./utils/config');
const jwt = require ('jsonwebtoken');
const User = require ('./schema/User');
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments (),
    authorCount: async () => Author.collection.countDocuments (),
    allBooks: async (root, args) => {
      if (!args.author) {
        return Book.find ({}).populate ('author');
      }
      const authorId = await Author.findOne ({name: args.author}).select (
        '_id'
      );
      return Book.find ({author: {$in: authorId}}).populate ('author');
    },
    allAuthors: async () => {
      return Author.find ({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async root => {
      const authorId = await Author.findOne ({name: root.name}).select ('_id');
      return Book.find ({
        author: {
          $in: authorId,
        },
      }).countDocuments ();
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError ('You must log in to continue!');
      }
      const author = await Author.findOne ({name: args.author});
      const book = new Book ({...args, author: author});
      try {
        await book.save ();
      } catch (error) {
        throw new UserInputError (error.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError ('You must log in to continue!');
      }

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
    createUser: async (root, args) => {
      const user = new User ({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save ().catch (error => {
        throw new UserInputError (error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne ({username: args.username});

      if (!user || args.password !== 'secret') {
        throw new UserInputError ('Wrong password! Try again!');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {value: jwt.sign (userForToken, config.JWT_SECRET)};
    },
  },
};

const server = new ApolloServer ({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase ().startsWith ('bearer ')) {
      const decodedToken = jwt.verify (auth.substring (7), config.JWT_SECRET);
      const currentUser = await User.findById (decodedToken.id).populate (
        'favoriteGenre'
      );
      return {currentUser};
    }
  },
});

server.listen ().then (({url}) => {
  console.log (`Server ready at ${url}`);
});
