const express = require('express');
const router = express.Router();

contador = 1;
const prontuarios = [
    {
        cpfProntuario: "Teste",
        inicioTratamento: "01/01/2021",
        tipoDoenca: "Esquizofrênia",
        gravidade: "alta",
        medicamento: "tarja preta",
        observacoes: "uma observacao feita pelo doutor",
    }
];

router.post('/cadastro', async (req, res) => {

    const {
        cpfProntuario,
        inicioTratamento,
        tipoDoenca,
        gravidade,
        medicamento,
        observacoes,
    } = req.body;

    prontuarios.push({ cpfProntuario, inicioTratamento, tipoDoenca, gravidade, medicamento, observacoes });
    prontuarios[contador].idProntuario = contador;
    console.log('prontuario Cadastrado: ',prontuarios[contador]);
    res.status(200).json(prontuarios[contador]);
    contador++;

});

router.get('/pesquisa', (req, res) => {

    const {
        idProntuario,
        cpfProntuario,
        inicioTratamento,
        tipoDoenca,
        gravidade,
        medicamento,
        observacoes,
    
    } = req.query;

    let filtros = []

    if (cpfProntuario) filtros.push('cpfProntuario');
    if (inicioTratamento) filtros.push('inicioTratamento');
    if (tipoDoenca) filtros.push('tipoDoenca');
    if (gravidade) filtros.push('gravidade');
    if (medicamento) filtros.push('medicamento');
    if (observacoes) filtros.push('observacoes');
    if (idProntuario) filtros.push('idProntuario');

    const prontuario = prontuarios.filter(pront => {
        return filtros.every((valor) => { return req.query[valor] == pront[valor] });
    });

    if (prontuario) {
        return res.status(200).json(prontuario);
    }
    return res.status(404).end();
});

router.put('/alterar-prontuario', (req, res) => {

    const {
        idProntuario,
        cpfProntuario,
        inicioTratamento,
        tipoDoenca,
        gravidade,
        medicamento,
        observacoes,
    } = req.body;

    const paciente = prontuarios.find((prontuario) => { return prontuario.idProntuario == idProntuario });

    paciente.cpfProntuario = cpfProntuario;
    paciente.inicioTratamento = inicioTratamento;
    paciente.tipoDoenca = tipoDoenca;
    paciente.gravidade = gravidade;
    paciente.medicamento = medicamento;
    paciente.observacoes = observacoes;

    res.status(204).end();
})

router.delete('/excluir-prontuario', (req, res) => {
    const idProntuario = req.body.idProntuario
    prontuarios.splice(prontuarios.find((prontuario, i) => { if (prontuario.idProntuario == idProntuario) return i }), 1)
    res.status(204).end()
})

module.exports = router;