const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log("give database password as an argument")
    process.exit(1)
}

const password = process.argv[2]
const url = 
    `mongodb+srv://kiisshen:${password}@puhelinluettelo.hsrdx9d.mongodb.net/?
    retryWrites=true&w=majority&appName=Puhelinluettelo`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: String
})
const Person = mongoose.model("Person", personSchema)

if(process.argv.length < 5){
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}
else{
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4],
        id: String(Math.floor(Math.random()*10000))
    })
    newPerson.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to the phonebook`)
        mongoose.connection.close()
    })
}
