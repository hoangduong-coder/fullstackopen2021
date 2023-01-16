import {useEffect, useState} from 'react';

import {LOGIN} from '../queries';
import {useMutation} from '@apollo/client';

const LoginForm = ({setToken, show}) => {
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const [login, result] = useMutation (LOGIN);

  useEffect (
    () => {
      if (result.data) {
        const token = result.data.login.value;
        setToken (token);
        localStorage.setItem ('book-user-token', token);
      }
    },
    [result.data] //eslint-disable-line
  );

  if (!show) {
    return null;
  }

  const submit = e => {
    e.preventDefault ();
    login ({
      variables: {username, password},
    });
  };

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={submit}>
        <div>
          <span>Username </span>
          <input
            type="text"
            value={username}
            onChange={({target}) => setUsername (target.value)}
          />
        </div>
        <div>
          <span>Password </span>
          <input
            type="password"
            value={password}
            onChange={({target}) => setPassword (target.value)}
          />
        </div>
        <button type="submit">SIGN IN</button>
      </form>
    </div>
  );
};
export default LoginForm;
