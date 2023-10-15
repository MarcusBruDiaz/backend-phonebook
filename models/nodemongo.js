require('dotenv').config();

const mongoose= require('mongoose');

const url = process.env.MONGODB_URI;

console.log(`connecting to ${url}`);



mongoose.connect(url)
    .then(result=>console.log('Coneccted to MongoDB'))
    .catch(err=>console.log(`Error conecting to MongoDB: ${err.message}`))


const phoneBookShema = new mongoose.Schema({
    name: String,
    number : String,

})


phoneBookShema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('PhoneBook', phoneBookShema);