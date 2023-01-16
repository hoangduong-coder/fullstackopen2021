import {ALL_AUTHORS, EDIT_BIRTHYEAR} from '../queries';
import {useMutation, useQuery} from '@apollo/client';

import Select from 'react-select';
import {useState} from 'react';

const Authors = props => {
  const authors = useQuery (ALL_AUTHORS);
  const [name, setName] = useState ('');
  const [bornYear, setBornYear] = useState (0);
  let options = [];

  const [changeBirthYear] = useMutation (EDIT_BIRTHYEAR, {
    refetchQueries: [{query: ALL_AUTHORS}],
  });

  if (!props.show) {
    return null;
  }
  if (authors.loading) return <p>Loading!</p>;
  if (authors.data.allAuthors) {
    authors.data.allAuthors.forEach (a => {
      options.push ({value: a.name, label: a.name});
    });
  }

  const submitAction = async event => {
    event.preventDefault ();
    changeBirthYear ({variables: {name, setBornTo: bornYear}});
    setName ('');
    setBornYear (0);
  };
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

      <h2>Change birthyear</h2>
      <form onSubmit={submitAction}>
        <div>
          <span style={{marginRight: '10px'}}>Name</span>
          <Select
            defaultValue={name}
            onChange={target => setName (target.value)}
            options={options}
          />
        </div>
        <div>
          <span style={{marginRight: '10px'}}>Born</span>
          <input
            type="number"
            value={bornYear}
            onChange={({target}) => setBornYear (parseInt (target.value))}
          />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  );
};

export default Authors;
