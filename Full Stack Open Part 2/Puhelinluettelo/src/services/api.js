import axios from 'axios'
const baseUrl = 'https://puhelinluettelo-backend-lhbn.onrender.com/api/persons'
//https://puhelinluettelo-backend-lhbn.onrender.com/api/persons
//http://localhost:3001/api/persons

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const removeById = (id) => {
    return axios.delete(baseUrl+"/"+id)
}

const changeNumber = (name, newNumber) => {
    return axios.get(baseUrl).then(response => {
        const persons = response.data;
        const person = persons.find(p => p.name === name);
    
        if (person) {
          const updatedPerson = { ...person, number: newNumber };
          return axios.put(`${baseUrl}/${person.id}`, updatedPerson);
        }
        else {
          throw new Error(`Information of ${name} has already been removed from the server.`)
        }
      });
}

export default { getAll, create, removeById, changeNumber }
