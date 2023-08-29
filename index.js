const express = require('express');  // importo del modulo express, para crear el servidor en el backed.
const cors = require('cors'); // importo el modilo de cors para poder hacer consultas a nidtsitas url.
const app = express();  //ejecuto el modulo y guardo expres en la variable app

app.use(cors()); // uso el modulo cors en la aplicacion app
app.use(express.json()); // usp el json para recibior las solicitude echas por el cliente donde mandasn datos y esto los concierte a json.
app.use(express.static('build'))// Esto statis que recibi como parametro buil lo que va a haver es que ciuando encuentre una carptea build en el directoriod el backen lo va a ajecutar.




//Datos:
let phones=[
    {
        name: "Manuel",
        number: 23,
        id: 1
    }
]


const generateID = ()=>{
    const maxId = phones.length > 0 ? Math.max(...phones.map((n)=>n.id)) : 0 // aqui obtendo el  numero maximo del id de las notas actuamente.
    
    return maxId+1; // y le asiganos a la nodta un id: el cual es maxId el ultimo id mas alto mas 1
  
}






//Rutas:
app.get('/api/phones', (request,response)=>{
    response.json(phones)
})


app.post('/api/phones',(request,response)=>{
    const body = request.body;
    
    if(!body.name){ 
        return response.status(404).json({
            error: 'name missing'
        })
    }

    const phone ={
        name: body.name,
        number: body.number,
        id: generateID()
    }

    phones = phones.concat(phone);

    response.json(phone);

})





//Setup Server:
const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})


