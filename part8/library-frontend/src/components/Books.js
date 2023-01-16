import {useEffect, useState} from 'react';

import {ALL_BOOKS} from '../queries';
import {useQuery} from '@apollo/client';

const Books = props => {
  const [genresList, setGenresList] = useState (['all']);
  const [selection, setSelection] = useState ('all');
  const books = useQuery (ALL_BOOKS);

  useEffect (
    () => {
      setGenresList ();
    },
    [books]
  );

  if (!props.show) {
    return null;
  }
  if (books.loading) return <p>Loading!</p>;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map (a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
