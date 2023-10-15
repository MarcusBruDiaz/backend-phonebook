const { Int32 } = require('mongodb');
const mongoose = require('mongoose');


if( process.argv.length < 3 ){
    console.log( 'Please provide the password as an argument: node mongo.js <password>' );
    process.exit( 1 );
}

console.log(process.argv)


const password = process.argv[2];
const name= process.argv[3];
const numero = process.argv[4];


const uri = `mongodb+srv://MarcusBruDev:${password}@cluster0.yel3xsd.mongodb.net/note-app?retryWrites=true&w=majority`


mongoose.connect(uri);



const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String
})


const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema);// son llamads funciones constructoras para crear nuevos obj javaScript. basado en parametos proporcionados como el schema

const phonebook = new PhoneBook({
    name : name,
    number : numero
}) // aqui se crea un objeto con a funcopn constructora arriba definida, y automaticamente hereda metodos de esa clase constructora como guhardar el objeto en la base de datos.



/* phonebook.save().then((result)=>{  // aqio se utiliza el medoto sava en el oboeto phonebook, onde el metodo es hereaddo del PhoneBook, este metodo save devuelve una promesa y se puede manejar con un controlador de evetos mediente then
    console.log('Numbes saved');
    mongoose.connection.close();//a al finaklizar se se cierra la conexion si nuca se cierra el progrtama nunca finalizara su ejecucion.
})
 */


PhoneBook.find({type: String}).then((result)=>{  // la fucion constructiora tiene un meotodo para buscar objetos creados en la base de datos.
    result.forEach((phone)=>{
        console.log(phone)
    })
    
    mongoose.connection.close();


})
//console.log(phonebook);


//mongoose.connection.close()
//console.log("Funciona")
