require('dotenv').config();
const express = require('express');  // importo del modulo express, para crear el servidor en el backed.
const cors = require('cors'); // importo el modilo de cors para poder hacer consultas a distintas url.
const app = express();  //ejecuto el modulo y guardo expres en la variable app
const PhoneBook = require('./models/nodemongo')

const errorHandler  = (error,request,response,next)=>{
        console.log(error.message)

        if(error.name =='CastError'){
            return response.status(404).send({error:'malformated id'})
        }

        next(error)
}

app.use(cors()); // uso el modulo cors en la aplicacion app
app.use(express.json()); // usp el json para recibior las solicitude echas por el cliente donde mandasn datos y esto los concierte a json.
app.use(express.static('build'))// Esto statis que recibi como parametro buil lo que va a hacer es que ciuando encuentre una carptea build en el directoriod el backen lo va a ajecutar.
app.use(errorHandler)




const generateID = ()=>{
    const maxId = phones.length > 0 ? Math.max(...phones.map((n)=>n.id)) : 0 // aqui obtendo el  numero maximo del id de las notas actuamente.
    return maxId+1; // y le asiganos a la nodta un id: el cual es maxId el ultimo id mas alto mas 1
}






//Rutas:
app.get('/api/phones', (request,response)=>{
    PhoneBook.find({})
            .then((result)=>{
                response.json(result)
            })
})




app.post('/api/phones',(request,response)=>{
    
    const body = request.body;
    
   if(body.name ===undefined){
        return  response.status(404).json({error:'contst missing'})
   }

   const phoneBook = new PhoneBook({
        name: body.name,
        number: body.number
   }) 

   phoneBook.save(phoneBook).then((savePhoneBook)=>{
        response.json(savePhoneBook)
   })
})


app.delete('/api/phones/:id',(request,response,next)=>{
    const id = request.params.id

    PhoneBook.findByIdAndRemove(id)
        .then(result=>{
            response.status(204).end()
        })
        .catch(error=>{
            next(error)
        })
})




const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)




//Setup Server:
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})


