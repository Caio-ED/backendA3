const axios = require('axios');
const e = require('express');
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

router.post("", async (req, res) => {
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

    await axios.post('http://localhost:10000/eventos', {
        tipoEvento: 'usuarioCadastrado',
        dados: {
            user: req.body
        }
    });
})

router.post("/login", async (req, res) => {
console.log('bateu');
    const { email, senha } = req.body
    const user = usuarios.find(user => { return user.email == email && user.senha == senha })

    if (user) {
        res.status(200).json(user)
        try {
            await axios.post('http://localhost:10000/eventos', {
                tipoEvento: 'usuarioLogado',
                dados: user
            });
        } catch (error) {
            console.log(error);
        }
        
    } else {
        return res.status(404).json({message: 'Usuario não foi encontrado!'});
    }
});
// - testar: localhost:4000/usuarios/login?email=dev@root.com&senha=123456

router.put('', async (req, res) => {
    const {
        nome,
        cpf,
        email,
        senha,
        tipoAcesso
    } = req.body;
    const user = usuarios.find((user) => { return user.cpf == cpf });

    user.nome = nome
    user.cpf = cpf
    user.email = email
    user.senha = senha
    user.tipoAcesso = tipoAcesso

    await axios.post('http://localhost:10000/eventos', {
        tipoEvento: 'usuarioAtualizado',
        dados: user
    });

    res.status(204).json(user);

})

router.delete("", async (req, res) => {

    const cpf = req.body.cpf

    let user = usuarios.find((user, i) => { 
        if (user.cpf == cpf) {
            user.id_exclusao = i
            return user 
        }
        return false
    });

    if (user) {
        usuarios.splice(user.id_exclusao, 1);
        await axios.post('http://localhost:10000/eventos', {
            tipoEvento: 'usuarioApagado',
            dados: user
        });
        res.status(204).end()
    } else {
        return res.status(404).end();
    }


});

router.post('/eventos', (req, res) => {
    console.log(req.body);
    res.status(200).end();
});

module.exports = router;
