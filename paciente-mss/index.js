const express = require("express");
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

const rotasPaciente = require("./paciente");

app.use('/pacientes', rotasPaciente)

app.listen(3000, () => {
    console.log("servidor subiu...")
})