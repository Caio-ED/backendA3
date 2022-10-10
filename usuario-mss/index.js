const express = require("express");
const app = express();
app.use(express.json())

const rotasUsuario = require("./usuario")

app.use('/usuarios', rotasUsuario)

app.listen(4000, () => {
    console.log("servidor subiu...")
})