const express = require("express");
const app = express();
app.use(express.json())

const rotasPaciente = require("./paciente");

app.use('/pacientes', rotasPaciente)

app.listen(3000, () => {
    console.log("servidor subiu...")
})