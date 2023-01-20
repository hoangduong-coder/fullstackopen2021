import {ALL_BOOKS, USER} from '../queries';

import {useQuery} from '@apollo/client';

const Recommend = props => {
  const currentUser = useQuery (USER);
  const books = useQuery (ALL_BOOKS);
  if (!props.show) return null;
  if (books.loading) return <p>Loading...</p>;
  const allBooks = books.data.allBooks.filter (book =>
    book.genres.includes (currentUser.data.me.favoriteGenre.toLowerCase ())
  );
  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books with your favorite genre
        {' '}
        <b>{currentUser.data.me.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th />
            <th>Author</th>
            <th>Published</th>
          </tr>
          {allBooks.map (a => (
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

export default Recommend;
