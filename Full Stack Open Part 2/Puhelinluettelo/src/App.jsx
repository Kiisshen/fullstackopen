import { useState } from 'react'

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

const PersonForm = ({setNewName, setNewNumber, persons, setPersons, newName, newNumber}) => {
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
      id: persons.length + 1,
    }
    const isNameExists = persons.some(person => person.name === newName);
    isNameExists ?
    (
      alert(`${newName} is already added to phonebook`)
    ) :
    (
      setPersons(persons.concat(newPerson)),
      setNewName(''),
      setNewNumber('')
    )
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

const Persons = ({filtered}) => {
  return (
    <>
      {filtered.map(((person, idx) => <p key={idx}>{person.name} {person.number}</p>))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} setFilt={setFilter}/>
      <h3>add a new</h3>
        <PersonForm 
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          setPersons={setPersons}
          persons={persons}
          newName={newName}
          newNumber={newNumber}
        />
      <h3>Numbers</h3>
      <Persons filtered={filtered}/>
    </div>
  )

}

export default App