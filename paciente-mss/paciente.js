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
    pacientes.push({ nome, dataNascimento, cpf, telefone, entradaClinica, endereco })
    res.status(200).json(pacientes[contador]);
    contador++;
});

router.get('/pesquisa', (req, res) => {

    const {
        nome,
        dataNascimento,
        cpf,
        telefone,
        entradaClinica,
        endereco
    } = req.query;

    const paciente = pacientes.find(pac => {
        let corresponde = true
        if (nome) corresponde = (pac.nome == nome);
        if (dataNascimento) corresponde = (pac.dataNascimento == dataNascimento);
        if (cpf) corresponde = (pac.cpf == cpf);
        if (telefone) corresponde = (pac.telefone == telefone);
        if (entradaClinica) corresponde = (pac.entradaClinica == entradaClinica);
        if (endereco) corresponde = (pac.endereco == endereco);
        return corresponde;
    });
    res.status(200).json(paciente) // tá retornando OK mas não exibe o paciente no response
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
    const paciente = pacientes.find((paciente) => { return paciente.cpf == cpf })
    console.log(paciente)
    paciente.nome = nome
    paciente.dataNascimento = dataNascimento
    paciente.cpf = cpf
    paciente.telefone = telefone
    paciente.entradaClinica = entradaClinica
    paciente.endereco = endereco
    res.status(204).json(paciente);
})



router.delete('/excluirPaciente', (req, res) => {
    const cpf = req.body.cpf
    pacientes.splice(pacientes.find((paciente, i) => { if (paciente.cpf == cpf) return i }), 1)
    res.status(204).end()
})

module.exports = router;