import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import {useApolloClient} from '@apollo/client';
import {useState} from 'react';

const App = () => {
  const [page, setPage] = useState ('authors');
  const [token, setToken] = useState (null);
  const client = useApolloClient ();

  const logout = () => {
    setToken (null);
    localStorage.clear ();
    client.resetStore ();
  };

  if(token && page ==="login") {
    setPage("authors")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage ('authors')}>authors</button>
        <button onClick={() => setPage ('books')}>books</button>
        {token
          ? <>
              <button onClick={() => setPage ('add')}>add book</button>
              <button onClick={() => setPage ('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
          : 
              <button onClick={() => setPage ('login')}>sign in</button>
            }
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === "recommend"}/>
      {
        !token && <LoginForm setToken={setToken} show={page === 'login'} />
      }
    </div>
  );
};

export default App;
