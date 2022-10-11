const express = require('express');
const router = express.Router();

contador = 0;
const pacientes = [
    {
        nome: "Paciente00",
        dataNascimento: "01/01/2001",
        cpf: "000.000.000-01",
        telefone: "11 9000-0001",
        entradaClinica: "01/01/2021",
        endereco: "Rua canjas de Galinhas"
      }
];

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
    
    let filtros = []
    
    if (nome) filtros.push('nome');
    if (dataNascimento) filtros.push('dataNascimento');
    if (cpf) filtros.push('cpf');
    if (telefone) filtros.push('telefone');
    if (entradaClinica) filtros.push('entradaClinica');
    if (endereco) filtros.push('endereco');

    const paciente = pacientes.find(pac => {
        return filtros.every((valor) => {return req.query[valor] == pac[valor]});
    });

    if (paciente) {
        return res.status(200).json(paciente)
    }
    return res.status(404).end();
});
// testar em: localhost:3000/pacientes/pesquisa?nome=Paciente00... caso outro colacar um & antes

router.put('/alterar-cadastro', (req, res) => {

    const {
        nome,
        dataNascimento,
        cpf,
        telefone,
        entradaClinica,
        endereco
    } = req.body;

    const paciente = pacientes.find((paciente) => { return paciente.cpf == cpf });

    paciente.nome = nome
    paciente.dataNascimento = dataNascimento
    paciente.cpf = cpf
    paciente.telefone = telefone
    paciente.entradaClinica = entradaClinica
    paciente.endereco = endereco

    res.status(204).end();
})

router.delete('/excluir-paciente', (req, res) => {
    const cpf = req.body.cpf
    pacientes.splice(pacientes.find((paciente, i) => { if (paciente.cpf == cpf) return i }), 1)
    res.status(204).end()
})

module.exports = router;