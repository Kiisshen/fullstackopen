import { useState, useEffect } from 'react'
import api from './services/api.js'
import './style/app.css'

const Filter = ({filter, setFilt}) => {
  const handleFilterChange = (e) => {
    e.preventDefault()
    setFilt(e.target.value)
  }
  return (
    <>
      <div>
        filter shown with: <input value={filter} onChange={handleFilterChange}/>
      </div>
    </>
  )
}

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  const displayMessage = typeof message === 'string' ? message : JSON.stringify(message);

  return (
    <>{(error) ? (
      <>
        <div className="error-red">
          {displayMessage}
        </div>
      </>) : (
        <>
          <div className="error">
            {displayMessage}
          </div> 
        </>)}
    </>
      
  )
}

const PersonForm = ({setNewName, setNewNumber, persons, setPersons, newName, newNumber, setErrorMessage, setIsError}) => {
  const handleNameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    e.preventDefault()
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(Math.floor(Math.random()*10000)),
    }
    const isNameExists = persons.some(person => person.name === newName);
    if (isNameExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        api.changeNumber(newName, newNumber).then(response => {
          setPersons(persons.map(person => 
            person.id !== response.data.id ? person : response.data
          ));
          setErrorMessage("Updated "+newName)
          setIsError(false)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('');
          setNewNumber('');
        }).catch((error) => {
          console.log(error)
          setErrorMessage(error.message)
          setIsError(true)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        });
      }
    } else {
      api.create(newPerson).then(response => {
        setErrorMessage("Added "+newName)
        setIsError(false)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000),
        setPersons(persons.concat({...newPerson, id: response.data.id}));
        setNewName('');
        setNewNumber('');
      }
    ).catch((error) => {
      console.log("moi")
      console.log(error.response)
      setErrorMessage(error.response.data.error)
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    });
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({filtered, setPersons, persons, setErrorMessage, setIsError}) => {
  const handleRemove = (id, name) => {
    if(window.confirm("Delete "+name+"?")){
      api.removeById(id).then(() => {
        setPersons(persons.filter((obj) => obj.id !== id))
        setErrorMessage("Removed "+name)
        setIsError(false)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <>
      {filtered.map(((person, idx) => 
        <div key={idx}>
          <p >{person.name} {person.number}</p>
          <button onClick={() => handleRemove(person.id, person.name)}>Poista</button>
        </div>
      ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    api.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={errorMessage} error={isError}/>
        <Filter filter={filter} setFilt={setFilter}/>
      <h3>add a new</h3>
        <PersonForm 
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          setPersons={setPersons}
          setErrorMessage={setErrorMessage}
          setIsError={setIsError}
          persons={persons}
          newName={newName}
          newNumber={newNumber}
        />
      <h3>Numbers</h3>
      <Persons 
        filtered={filtered}
        setPersons={setPersons}
        persons={persons}
        setErrorMessage={setErrorMessage}
        setIsError={setIsError}
      />
    </div>
  )

}

export default App