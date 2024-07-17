import axios from 'axios'
const baseUrl = 'https://puhelinluettelo-backend-lhbn.onrender.com/api/persons'

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
      });
}

export default { getAll, create, removeById, changeNumber }
