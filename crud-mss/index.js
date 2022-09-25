const express = require("express");
const app = express();

app.use(express.json())
app.listen(4000, () => {
    console.log("servidor subiu...")
})

const usuarios = [];

app.post("/usuarios", (req, res) => {
    const {
        Nome,
        CPF,
        Email,
        Senha,
        TipoAcesso
    } = req.body;
    usuarios.push({Nome,CPF,Email,senha,TipoAcesso})

})