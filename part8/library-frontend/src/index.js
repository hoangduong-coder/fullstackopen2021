import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {setContext} from '@apollo/client/link/context';

const authLink = setContext ((_, {headers}) => {
  const token = localStorage.getItem ('book-user-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const link = new HttpLink ({
  uri: 'http://localhost:4000/',
});

const client = new ApolloClient ({
  cache: new InMemoryCache (),
  link: authLink.concat (link),
});

ReactDOM.createRoot (document.getElementById ('root')).render (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
