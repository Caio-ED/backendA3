const express = require('express');
const router = express.Router();


contador = 0;
const usuarios = [];

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

router.put('', (req, res) => {
    const {
        nome,
        cpf,
        email,
        senha,
        tipoAcesso
    } = req.body;
    const user = usuarios.find((user)=>{return user.cpf==cpf})
   console.log(user)
    user.nome= nome
    user.cpf= cpf
    user.email= email
    user.senha=senha
    user.tipoAcesso= tipoAcesso 
    res.status(204).json(user);
   
})

router.get("", (req, res) => {
   
    const{email, senha} = req.query
    const user = usuarios.find(user=>{return user.email == email && user.senha==senha
    })
    res.status(200).json(user)
    
})

router.delete("", (req,res)=>{

    const cpf = req.body.cpf
    usuarios.splice(usuarios.find((user,i)=>{if (user.cpf==cpf) return i}),1)
    res.status(204).end()
})

module.exports = router;
