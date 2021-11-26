import React, {useState, useEffect} from 'react';
import userService from './services/handleList';
const Filter = ({kw, action}) => {
  return(
    <div>
      <p>Filter shown with </p>
      <input name="keyword" value={kw} onChange={action}/>
    </div>
  )
}
const PersonForm = ({onSubmit, name, phone, action}) => {
  return(
    <form onClick={onSubmit}>
      <div>
        <p>Name: </p>
        <input name="name" value={name} onChange={action}/>
      </div>
      <div>
        <p>Phone: </p>
        <input name="phone" value={phone} onChange={action} />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}
const Person = ({name, phone, del}) => {
  return(
    <div>
      <p>{name}, {phone}</p>
      <button onClick={del}>Delete</button>
    </div>
  )
}
const List = ({arr, handleDelete}) => {
  return(
    <div>
      {
        arr.map(obj => 
          <Person name={obj.name} key={obj.id} phone={obj.phone} del={() => handleDelete(obj.id)}/>
        )
      }
    </div>
  )
} 
const Notification = ({message, type}) => {
  if(message === null) {
    return null
  }
  return(
    <div className={type}>
      {message}
    </div>
  )
}
const App = () => {
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState(false);
  const [people, setPeople] = useState([]);
  const [mess, setMess] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    userService
    .getUser()
    .then(initialUser => setPeople(initialUser));
  }, []);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setNewName(event.target.value)
        break
      case "phone":
        setPhoneNumber(event.target.value)
        break
      case "keyword":
        setKeyword(event.target.value)
        keyword.length !== null ? setFilter(true) : setFilter(false);
        break
      default:
        break;
    }
  }

  const addName = event => {
    event.preventDefault();
    const newUser = {
      name: newName,
      phone: phoneNumber,
      id: newName + phoneNumber,
    };
    if(newName !== "" && phoneNumber !== "") {
      if (people.filter (obj => obj.name === newUser.name).length > 0) {
        const thisUser = people.find (obj => obj.name === newName);
        if (window.confirm (`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const copyUser = {...thisUser, phone: phoneNumber};
          userService
          .updateUser(copyUser.id, copyUser).then(returnUser => {
            setPeople(people.map(obj => (obj.id !== copyUser.id ? obj : returnUser)))
            setMess(`${newName}'s phone number have been updated to the server`)
            setType("notification")
            setTimeout(() => {
              setMess(null)
            }, 5000)
          })
          .catch(error => {
            setMess(`${newName} was already removed from server`)
            setType('error');
            setTimeout(() => {
              setMess(null)
            }, 5000)
            setPeople(people.filter(obj => obj.id !== thisUser.id))
          });
        }
        setNewName('');
        setPhoneNumber('');
      } else {
        userService
        .createUser(newUser).then(result => {
          setPeople(people.concat(result));
          setMess(`${newName} have been added to the server`)
          setType('notification')
          setTimeout(() => {
            setMess(null)
          }, 5000)
          setNewName('');
          setPhoneNumber('');
        });
      }
    } else {
      return;    
    }
  }

  const nameFilter = filter
  ? people.filter(obj => obj.name.toLowerCase().includes(keyword.toLowerCase()))
  : people;

  const deleteName = id => {
    const thisUser = people.find(obj => obj.id === id);
    if(window.confirm(`Delete ${thisUser.name}?`)){
      userService
      .deleteUser(id, thisUser)
      .then(
        setPeople(people.filter(obj => obj.id !== id))
      );
    }
  };

  return(
    <div>
      <Notification message={mess} type={type}/>
      <h2>Phonebook</h2>
      <Filter kw={keyword} action={handleChange}/>
      <h3>New person</h3>
      <PersonForm name={newName} phone={phoneNumber} action={handleChange} onSubmit={addName}/>
      <h3>Numbers</h3>
      <List arr={nameFilter} handleDelete={deleteName}/>
    </div>
  )
}

export default App;
