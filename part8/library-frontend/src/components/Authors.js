import {gql, useQuery} from '@apollo/client';

const ALL_AUTHORS = gql`
query Query {
  allAuthors {
    name
    born
    bookCount
  }
}
`;

const Authors = props => {
  const authors = useQuery (ALL_AUTHORS);
  console.log (authors);
  if (!props.show) {
    return null;
  }
  if (authors.loading) return <p>Loading!</p>;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map (a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
