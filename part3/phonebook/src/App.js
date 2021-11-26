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
const Notification = ({obj}) => {
  if(obj.message === null) {
    return null
  }
  return(
    <div className={obj.type}>
      {obj.message}
    </div>
  )
}
const App = () => {
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState(false);
  const [people, setPeople] = useState([]);
  const [notification, setNotification] = useState({});

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

  const notifyWith = (mess, type) => {
    setNotification({
      message: mess, 
      type: type})
    setTimeout(() => {
      setNotification({});
    }, 5000);
  }

  const addName = event => {
    event.preventDefault();
    const newUser = {
      name: newName,
      phone: phoneNumber,
    };
    if(newName !== "" && phoneNumber !== "") {
      const thisUser = people.find(obj => obj.name === newUser.name);
      if(thisUser) {
        const okChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
        if(okChange) {
          const copyUser = {...thisUser, phone: phoneNumber};
          userService
          .updateUser(thisUser.id, copyUser).then(returnUser => {
            setPeople(people.map(obj => (obj.id !== copyUser.id ? obj : returnUser)))
            notifyWith(`${newName}'s phone number have been updated to the server`, "notification");
          })
          .catch(error => {
            notifyWith(`${newName} was already removed from server`, 'error');
            setPeople(people.filter(obj => obj.id !== thisUser.id))
          });
        }
        setNewName('');
        setPhoneNumber('');
      } else {
        userService
        .createUser(newUser)
        .then(result => {
          setPeople(people.concat(result));
          notifyWith(`${newName} have been added to the server`, 'notification')
          setNewName('');
          setPhoneNumber('');
        })
        .catch(error => {
          notifyWith(error.response.data.error, 'error')
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
      .deleteUser(id)
      .then(() => {
        setPeople(people.filter(obj => obj.id !== id))
        notifyWith(`Delete ${newName} successfully!`, 'notification');
      })
      .catch(() => {
        setPeople(people.filter(obj => obj.id !== id))
        notifyWith(`${thisUser.name} have been removed`, 'error');
      })
    }
  };

  return(
    <div>
      <Notification obj={notification}/>
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
