var mongoose = require('mongoose')
var mongodb = require('mongodb')

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
        validator: function(v) {
          return /^\d{3}-\d{9}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
    },
  }
})

if(process.argv.length <3){ 
    console.log('insufficient arguments')
    process.exit(2)
}


const pass = process.argv[2]

const url = `mongodb+srv://fso_piwkom:${process.env.MONGODB_PASS}@clusterfso.vie6fru.mongodb.net/FSO?retryWrites=true&w=majority&appName=ClusterFSO`

mongoose.set('strictQuery',false)

mongoose.connect(url)


const Person = mongoose.model('Person',personSchema)

if(process.argv.length < 5){
    Person.find({}).then(result=>{
        console.log("Phonebook:")
        result.forEach(t =>{
            console.log(t)
        })
        mongoose.connection.close()
    })
}

if(process.argv.length == 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person.save().then(result=>{
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}