const express = require('express');
const router = express.Router();

contador = 0;
const prontuarios = [];

router.post('/cadastro', (req, res) => {

    const {
        campo
    } = req.body;

    prontuarios.push({campo})
    res.status(200).json(prontuarios[contador]);
    contador++;
});

router.get('/pesquisa', (req, res) => {

    const {
        campo
    } = req.query;
    
    let filtros = []
    
    if (campo) filtros.push('campo');
    

    const prontuario = prontuarios.find(pront => {
        return filtros.every((valor) => {return req.query[valor] == pront[valor]});
    });

    if (prontuario) {
        return res.status(200).json(prontuario)
    }
    return res.status(404).end();
});

router.put('/alterar-prontuario', (req, res) => {

    const {
        campo
    } = req.body;

    const paciente = prontuarios.find((prontuario) => { return prontuario.id_prontuario == id_prontuario });

    paciente.campo = campo

    res.status(204).end();
})

router.delete('/excluir-prontuario', (req, res) => {
    const id_prontuario = req.body.id_prontuario
    prontuarios.splice(prontuarios.find((prontuario, i) => { if (prontuario.id_prontuario == id_prontuario) return i }), 1)
    res.status(204).end()
})

module.exports = router;