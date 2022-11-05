const express = require("express");
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

const rotasUsuario = require("./usuario")

app.use('/usuarios', rotasUsuario)

app.listen(4000, () => {
    console.log("Usuarios - MSS: 4000")
})