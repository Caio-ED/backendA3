const express = require('express');
const router = express.Router();


contador = 0;
const usuarios = [
    {
        "nome": "Desenvolvimento",
        "cpf": "000.000.000-00",
        "email": "dev@root.com",
        "senha": "123456",
        "tipoAcesso": "root"
    }
];

router.post("", (req, res) => {
    const {
        nome,
        cpf,
        email,
        senha,
        tipoAcesso
    } = req.body;
    usuarios.push({ nome, cpf, email, senha, tipoAcesso })
    res.status(201).json(usuarios[contador]);
    contador++;
})

router.get("/login", (req, res) => {
    console.log(req.query);
    const { email, senha } = req.query
    const user = usuarios.find(user => { return user.email == email && user.senha == senha })

    if (user) {
        return res.status(200).json(user)
    }

    return res.status(401).end();

});
// - testar: localhost:4000/usuarios/login?email=dev@root.com&senha=123456

router.put('', (req, res) => {
    const {
        nome,
        cpf,
        email,
        senha,
        tipoAcesso
    } = req.body;
    const user = usuarios.find((user) => { return user.cpf == cpf })
    console.log(user)
    user.nome = nome
    user.cpf = cpf
    user.email = email
    user.senha = senha
    user.tipoAcesso = tipoAcesso
    res.status(204).json(user);

})

router.delete("", (req, res) => {

    const cpf = req.body.cpf
    usuarios.splice(usuarios.find((user, i) => { if (user.cpf == cpf) return i }), 1)
    res.status(204).end()
})

module.exports = router;
