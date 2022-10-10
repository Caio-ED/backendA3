const express = require("express");
const app = express();
app.use(express.json())

const rotasPaciente = require("./paciente");

app.use('/', rotasPaciente)

app.listen(4000, () => {
    console.log("servidor subiu...")
})