/* eslint-disable no-undef */
const mongoose = require('mongoose')

const length = process.argv.length

const personSchema = new mongoose.Schema({
    name: String,
    phone: String
})
const Person = mongoose.model('Person', personSchema)

if(length >= 3) {
    let password = process.argv[2]
    const url = `mongodb+srv://e1900281:${password}@cluster0.jazn3.mongodb.net/user?retryWrites=true&w=majority`
    mongoose.connect(url)

    if(length === 3) {
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })
    } else if (length === 5) {
        const newUser = new Person({
            name: process.argv[3],
            phone: process.argv[4]
        })
        newUser.save().then(result => {
            console.log(`Added ${result.name} number ${result.phone} to phonebook`)
            mongoose.connection.close();
        })
    } else {
        console.log('Please provide <password> or <password> <name> <phone>')
        process.exit(1)
    }
} else {
    console.log('Please provide <password> or <password> <name> <phone>');
    process.exit(1)
}