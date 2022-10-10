const express = require('express');
const router = express.Router();

contador = 0;
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

router.put('/alterarCadastro', (req, res) => {
    const {
        nome,
        dataNascimento,
        cpf,
        telefone,
        entradaClinica,
        endereco
    } = req.body;
    const paciente = pacientes.find((paciente)=>{return paciente.cpf==cpf})
    console.log(paciente)
    paciente.nome= nome
    paciente.dataNascimento= dataNascimento
    paciente.cpf= cpf
    paciente.telefone= telefone
    paciente.entradaClinica= entradaClinica
    paciente.endereco= endereco
    res.status(204).json(paciente);
})



module.exports = router;