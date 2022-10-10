const express = require('express');
const router = express.Router();

contador = 0;
const pacientes = [];

router.get('/pacientes', (req, res) => {
    return res.json(pacientes); // só está exibindo a lista de pacientes na primeira requisição
})

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

router.get('/pesquisarPaciente', (req, res) => {
    const cpf = req.query
    const paciente = pacientes.find(pac =>{ if (pac.cpf == cpf) return pac})
    res.status(200).json(paciente) // tá retornando OK mas não exibe o paciente no response
})

router.delete('/excluirPaciente', (req, res) => {
    const cpf = req.body.cpf
    pacientes.splice(pacientes.find((paciente,i)=>{if (paciente.cpf==cpf) return i}),1)
    res.status(204).end()
})

module.exports = router;