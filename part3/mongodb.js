var mongoose = require('mongoose')
var mongodb = require('mongodb')

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

if(process.argv.length <3 || process.argv.length == 4){ 
    console.log('insufficient arguments')
    process.exit()
}


const pass = process.argv[2]

const url = `mongodb+srv://fso_piwkom:${pass}@clusterfso.vie6fru.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFSO`

mongoose.set('strictQuery',false)

mongoose.connect(url)


const Person = mongoose.model('Person',personSchema)

if(process.argv.length < 4){
    Person.find({}).then(result=>{
        result.forEach(person => {
            console.log(person)
          })
          mongoose.connection.close()
    })
    process.exit()
}

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

person.save().then(result=>{
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
})