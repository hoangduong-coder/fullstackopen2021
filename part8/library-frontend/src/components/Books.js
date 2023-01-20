import {ALL_BOOKS, BOOKS_BY_GENRE} from '../queries';
import {useEffect, useState} from 'react';

import {useQuery} from '@apollo/client';

const Books = props => {
  const [genre, setGenre] = useState ('all');
  const [books, setBooks] = useState (null);
  const result_all = useQuery (ALL_BOOKS);
  const result_byGenre = useQuery (BOOKS_BY_GENRE, {
    variables: {genre},
    skip: !genre,
  });

  useEffect (
    () => {
      if (result_all.data) {
        setBooks (result_all.data.allBooks);
      }
    },
    [result_all.data]
  );

  useEffect (
    () => {
      if (result_byGenre.data) {
        setBooks (result_byGenre.data.allBooks);
      }
    },
    [result_byGenre.data]
  );

  if (!props.show) {
    return null;
  }

  if (result_all.loading || result_byGenre.loading) return <p>Loading!</p>;

  if (result_all.error || result_byGenre.error)
    return <p>There is some error in loading this page!</p>;

  const genresList = [...new Set (books.flatMap (b => b.genres))].concat (
    'all'
  );

  const filterGenre = genre => {
    setGenre (genre);
    if (genre === 'all') {
      setBooks (result_all.data.allBooks);
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
