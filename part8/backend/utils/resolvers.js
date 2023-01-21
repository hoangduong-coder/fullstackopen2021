const {UserInputError, AuthenticationError} = require ('apollo-server');
const Book = require ('../schema/Book');
const Author = require ('../schema/Author');
const User = require ('../schema/User');
const jwt = require ('jsonwebtoken');
const config = require ('./config');
const {PubSub} = require ('graphql-subscriptions');
const pubsub = PubSub ();
const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments (),
    authorCount: async () => Author.collection.countDocuments (),
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book.find ({genres: {$in: args.genre}}).populate ('author');
      } else if (args.author) {
        const authorId = await Author.findOne ({name: args.author}).select (
          '_id'
        );
        return Book.find ({author: {$in: authorId}}).populate ('author');
      }
      return Book.find ({}).populate ('author');
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

      pubsub.publish ('NEW_BOOK_ADDED', {bookAdded: book});
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator ('NEW_BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
