const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json())
contador = 0;

const usuarios = [];

app.post("/usuarios", (req, res) => { 
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

app.put('/usuarios', (req, res) => {
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

app.get("/usuarios", (req, res) => {
   
    const{email, senha} = req.query
    const user = usuarios.find(user=>{return user.email == email && user.senha==senha
    })
    res.status(200).json(user)
    
})

app.delete("/usuarios", (req,res)=>{

    const cpf = req.body.cpf
    usuarios.splice(usuarios.find((user,i)=>{if (user.cpf==cpf) return i}),1)
    res.status(204).end()
})


app.listen(4000, () => {
    console.log("servidor subiu...")
})
