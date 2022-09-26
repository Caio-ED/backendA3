const express = require('express');
const router = express.Router();
contador = 0;


router.use(express.json())

router.get('/pacientes', (req, res) => {
    res.status(200).json;
})

const pacientes = [];

router.post('/cadastro', (req, res) => {
    const {
        nome,
        dataNascimento,
        cpf,
        telefone,
        entradaClinica,
        endereco
    } = req.body;
    pacientes.push({ nome, dataNascimento, cpf, telefone, entradaClinica, endereco})
    res.status(200).json(pacientes[contador]);
    contador ++;
})

// router.put('/user', (req, res) => {
//     res.send('Got a PUT request at /user')
// })

// router.delete('/user', (req, res) => {
//     res.send('Got a DELETE request at /user')
// })

module.exports = router;