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




//Rutas:


app.get('/api/phones', (request,response)=>{
    response.json(phones)
})





//Setup Server:
const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})


