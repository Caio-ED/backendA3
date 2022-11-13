const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/eventos', (req, res) => {
    
    const evento = req.body;

    console.log(evento);
     
    // pacientes
    // axios.post('http://localhost:3000/pacientes/eventos', evento);
    // usuarios
    axios.post('http://localhost:4000/usuarios/eventos', evento);
    // prontuarios
    // axios.post('http://localhost:5000/prontuarios/eventos', evento);

    res.status(200).send({ msg: "ok" });
});

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000.')
})