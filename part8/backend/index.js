const {ApolloServer} = require ('apollo-server-express');
const mongoose = require ('mongoose');
const config = require ('./utils/config');
const jwt = require ('jsonwebtoken');
const {
  ApolloServerPluginDrainHttpServer,
} = require ('@apollo/server/plugin/drainHttpServer');
const {makeExecutableSchema} = require ('@graphql-tools/schema');
const express = require ('express');
const http = require ('http');
const typeDefs = require ('./schema/schema');
const resolvers = require ('./utils/resolvers');
const User = require ('./schema/User');
const {WebSocketServer} = require ('ws');
const {useServer} = require ('graphql-ws/lib/use/ws');

console.log ('connecting to', config.MONGO_URL);

mongoose
  .connect (config.MONGO_URL)
  .then (() => {
    console.log ('connected to MongoDB');
  })
  .catch (error => {
    console.log ('error connection to MongoDB:', error.message);
  });

const start = async () => {
  const app = express ();
  const httpServer = http.createServer (app);
  const schema = makeExecutableSchema ({typeDefs, resolvers});

  const wsServer = new WebSocketServer ({
    server: httpServer,
    path: '/',
  });

  const serverCleanup = useServer ({schema}, wsServer);

  const server = new ApolloServer ({
    schema,
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
    plugins: [
      ApolloServerPluginDrainHttpServer ({httpServer}),
      {
        async serverWillStart () {
          return {
            async drainServer () {
              await serverCleanup.dispose ();
            },
          };
        },
      },
    ],
  });

  await server.start ();

  server.applyMiddleware ({
    app,
    path: '/',
  });

  const PORT = 4000;

  httpServer.listen (PORT, () =>
    console.log (`Server is now running on http://localhost:${PORT}`)
  );
};

start ();
