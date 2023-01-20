import {useEffect, useState} from 'react';

import {ALL_BOOKS} from '../queries';
import {useQuery} from '@apollo/client';

const Books = props => {
  const result = useQuery (ALL_BOOKS);
  const [genre, setGenre] = useState ('all');
  const [books, setBooks] = useState (null);

  useEffect (
    () => {
      if (result.data) {
        setBooks (result.data.allBooks);
      }
    },
    [result.data]
  );

  if (!props.show) {
    return null;
  }
  if (result.loading) return <p>Loading!</p>;

  if (result.error) return <p>There is some error in loading this page!</p>;

  const genresList = [...new Set (books.flatMap (b => b.genres))].concat (
    'all'
  );

  const filterGenre = genre => {
    setGenre (genre);
    if (genre === 'all') {
      setBooks (result.data.allBooks);
    } else {
      setBooks (books.filter (obj => obj.genres.includes (genre)));
    }
  };

  return (
    <div>
      <h2>Books</h2>
      <p>In genre <b>{genre}</b></p>
      <table>
        <tbody>
          <tr>
            <th />
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map (a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}

        </tbody>
      </table>
      {genresList.map (obj => (
        <button key={obj} onClick={() => filterGenre (obj)}>{obj}</button>
      ))}
    </div>
  );
};

export default Books;
